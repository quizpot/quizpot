"use client"

import { LoaderCircle } from "lucide-react"
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"
import { useRouter } from "next/navigation"
import { getCookie, setCookie } from "cookies-next/client"
import FancyCard from "../ui/fancy-card"
import FancyButton from "../ui/fancy-button"
import { AllClientEvents, AllServerEvents } from "@quizpot/quizcore"
import TextInput from "../ui/text-input"
import LoadingPage from "../ui/loading-page"

const MAX_RECONNECT_ATTEMPTS = 5
const MAX_RECONNECT_TIMEOUT_MS = 30000
const WEBSOCKET_CONNECT_TIMEOUT_MS = 5000

type ServerEventName = AllServerEvents["event"]
type ClientEventName = AllClientEvents["event"]
type ServerEventByName<T extends ServerEventName> = Extract<
  AllServerEvents,
  { event: T }
>
type ClientEventByName<T extends ClientEventName> = Extract<
  AllClientEvents,
  { event: T }
>

type ServerEventHandlers = {
  [K in ServerEventName]?: ((ctx: ServerEventByName<K>) => void)[]
}

type ClientEventPayload<T extends ClientEventName> =
  ClientEventByName<T> extends { payload: infer P } ? P : undefined

const WebSocketContext = createContext<{
  isConnected: boolean
  clientId: string
  readyState: number
  error: string | null
  onEvent: <T extends ServerEventName>(
    event: T,
    handler: (ctx: ServerEventByName<T>) => void
  ) => () => void
  sendEvent: <T extends ClientEventName>(
    event: T,
    ...args: ClientEventPayload<T> extends undefined
      ? []
      : [payload: ClientEventPayload<T>]
  ) => void
} | null>(null)

interface WebSocketProviderProps {
  role: "host" | "player"
  code: string
  name?: string
  clientId?: string
  children: ReactNode
}

export const WebSocketProvider = ({
  role,
  code,
  name: nameProp,
  children,
  clientId: clientIdProp,
}: WebSocketProviderProps) => {
  const router = useRouter()

  const resolvedClientId = useRef<string>(clientIdProp ?? getOrCreateClientId(role, code))

  const [clientId] = useState<string>(resolvedClientId.current)
  const [name, setName] = useState<string | null>(nameProp ?? null)
  const [nameInput, setNameInput] = useState("")
  const [needsName, setNeedsName] = useState(false)
  const [readyState, setReadyState] = useState<number>(WebSocket.CONNECTING)
  const [error, setError] = useState<string | null>(null)

  const wsRef = useRef<WebSocket | null>(null)
  const handlersRef = useRef<ServerEventHandlers>({})
  const replayBufferRef = useRef<Partial<Record<ServerEventName, AllServerEvents[]>>>({})
  const isMountedRef = useRef(true)
  const reconnectTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const connectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const reconnectAttemptsRef = useRef(0)
  const nameRef = useRef<string | null>(nameProp ?? null)
  const connectRef = useRef<() => void>(null as unknown as () => void)

  const wsUrl = process.env.NEXT_PUBLIC_WS_URL

  const onEvent = useCallback(
    <T extends ServerEventName>(
      event: T,
      handler: (ctx: ServerEventByName<T>) => void
    ) => {
      const handlers = handlersRef.current
      if (!handlers[event]) handlers[event] = [] as ServerEventHandlers[T]
      ;(handlers[event] as ((ctx: ServerEventByName<T>) => void)[]).push(handler)

      const buffered = replayBufferRef.current[event]
      if (buffered && buffered.length > 0) {
        replayBufferRef.current[event] = []
        buffered.forEach((msg) => handler(msg as ServerEventByName<T>))
      }

      return () => {
        if (handlers[event]) {
          handlers[event] = (
            handlers[event] as ((ctx: ServerEventByName<T>) => void)[]
          ).filter((h) => h !== handler) as ServerEventHandlers[T]
        }
      }
    },
    []
  )

  const sendEvent = useCallback(
    <T extends ClientEventName>(
      event: T,
      ...args: ClientEventPayload<T> extends undefined
        ? []
        : [payload: ClientEventPayload<T>]
    ) => {
      if (wsRef.current?.readyState === WebSocket.OPEN) {
        try {
          const payload = args[0]
          wsRef.current.send(
            JSON.stringify(
              payload !== undefined ? { event, payload } : { event }
            )
          )
        } catch (err) {
          console.error("[WS] Failed to send event:", err)
        }
      }
    },
    []
  )

  connectRef.current = () => {
    if (!wsUrl) {
      console.error("[WS] wsUrl is not defined")
      return
    }

    if (!isMountedRef.current) return

    const id = resolvedClientId.current
    if (!id) {
      console.error("[WS] clientId is not defined")
      return
    }

    if (wsRef.current) {
      const state = wsRef.current.readyState
      if (state === WebSocket.OPEN || state === WebSocket.CONNECTING) return
      if (state === WebSocket.CLOSING) {
        wsRef.current.addEventListener(
          "close",
          () => {
            if (isMountedRef.current) connectRef.current()
          },
          { once: true }
        )
        return
      }
    }

    setReadyState(WebSocket.CONNECTING)
    setError(null)

    const params = new URLSearchParams({ id, code, role })
    if (nameRef.current) params.set("name", nameRef.current)

    const url = `${wsUrl}?${params.toString()}`

    try {
      const socket = new WebSocket(url)
      wsRef.current = socket

      connectTimeoutRef.current = setTimeout(() => {
        if (wsRef.current === socket && isMountedRef.current) {
          socket.close(4000, "Connection timeout")
        }
      }, WEBSOCKET_CONNECT_TIMEOUT_MS)

      socket.onopen = () => {
        if (!isMountedRef.current) return
        if (connectTimeoutRef.current) {
          clearTimeout(connectTimeoutRef.current)
          connectTimeoutRef.current = null
        }
        reconnectAttemptsRef.current = 0
        setReadyState(WebSocket.OPEN)
        setNeedsName(false)
        setError(null)
        replayBufferRef.current = {}
      }

      socket.onclose = (event) => {
        if (!isMountedRef.current) return
        if (connectTimeoutRef.current) {
          clearTimeout(connectTimeoutRef.current)
          connectTimeoutRef.current = null
        }
        setReadyState(WebSocket.CLOSED)

        if (event.code === 4003) {
          if (role === "player") setNeedsName(true)
          return
        }

        if (event.code === 1001 || event.code === 1000) return

        reconnectAttemptsRef.current += 1
        if (reconnectAttemptsRef.current >= MAX_RECONNECT_ATTEMPTS) {
          setError("Connection lost. Returning to home...")
          setTimeout(() => router.replace("/"), 2000)
          return
        }

        const delay = Math.min(
          1000 * 2 ** reconnectAttemptsRef.current,
          MAX_RECONNECT_TIMEOUT_MS
        )
        setError(`Reconnecting in ${Math.round(delay / 1000)}s...`)
        reconnectTimerRef.current = setTimeout(() => {
          if (isMountedRef.current) connectRef.current()
        }, delay)
      }

      socket.onerror = (err) => {
        if (!isMountedRef.current) return
        console.error("[WS] Error:", err)
      }

      socket.onmessage = (e) => {
        if (!isMountedRef.current) return
        let message: AllServerEvents
        try {
          message = JSON.parse(e.data.toString())
        } catch {
          return
        }

        const { event } = message
        const eventHandlers = (handlersRef.current[event] as ((ctx: AllServerEvents) => void)[] | undefined)

        if (!eventHandlers || eventHandlers.length === 0) {
          if (!replayBufferRef.current[event]) replayBufferRef.current[event] = []
          replayBufferRef.current[event]!.push(message)
          return
        }

        eventHandlers.forEach((h) => h(message))
      }
    } catch (err) {
      if (!isMountedRef.current) return
      setError("Failed to create connection")
    }
  }

  useEffect(() => {
    isMountedRef.current = true
    connectRef.current()

    return () => {
      try {
          isMountedRef.current = false
        if (connectTimeoutRef.current) clearTimeout(connectTimeoutRef.current)
        if (reconnectTimerRef.current) clearTimeout(reconnectTimerRef.current)
        const ws = wsRef.current
        if (ws && ws.readyState === WebSocket.OPEN) {
          ws.close(1001, "Component unmount")
        }
      } catch (ignored) { }
    }
  }, [])

  useEffect(() => {
    nameRef.current = name
  }, [name])

  const handleNameSubmit = useCallback(() => {
    const trimmed = nameInput.trim()
    if (!trimmed) return

    setName(trimmed)
    nameRef.current = trimmed
    setNeedsName(false)

    const ws = wsRef.current
    if (ws) {
      ws.onclose = null
      ws.close(1000, "Reconnecting with name")
    }

    setTimeout(() => connectRef.current(), 0)
  }, [nameInput])

  return (
    <WebSocketContext.Provider
      value={{
        isConnected: readyState === WebSocket.OPEN,
        clientId,
        readyState,
        error,
        onEvent,
        sendEvent,
      }}
    >
      {needsName ? (
        <div className="h-dvh w-full flex flex-col items-center justify-center gap-4">
          <FancyCard className="flex flex-col gap-4 p-4 w-full max-w-sm">
            <TextInput
              className="text-center"
              placeholder="Your name"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleNameSubmit()
              }}
            />
            <FancyButton disabled={!nameInput.trim()} onClick={handleNameSubmit} color="green">
              Join
            </FancyButton>
          </FancyCard>
        </div>
      ) : readyState !== WebSocket.OPEN ? (
        <LoadingPage message="Connecting to server ..." />
      ) : (
        children
      )}
    </WebSocketContext.Provider>
  )
}

export const useWebSocket = () => {
  const context = useContext(WebSocketContext)
  if (!context)
    throw new Error("useWebSocket must be used within a WebSocketProvider")
  return context
}

function getOrCreateClientId(role: "host" | "player", code: string): string {
  const key = `quizpot:${role}:${code}`
  const existing = getCookie(key)
  if (existing) return existing as string

  const id = crypto.randomUUID()
  setCookie(key, id, {
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 4,
    path: "/",
  })

  return id
}