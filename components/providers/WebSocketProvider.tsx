"use client"
import { ClientEvents } from "@/lib/client/ClientEvents"
import { WebSocketClient } from "@/lib/server/managers/WSClientManager"
import { ServerEvents } from "@/lib/server/ServerEvents"
import { Loader2, LoaderCircle } from "lucide-react"
import { createContext, ReactNode, useCallback, useContext, useEffect, useRef, useState } from "react"
import Disconnected from "../ui/disconnected"

const WebSocketContext = createContext<{
  isConnected: boolean
  clientId: string | null
  readyState: number
  error: string | null
  onEvent: <T extends keyof ServerEvents>(event: T, handler: (ctx: ServerEvents[T]) => void) => () => void
  sendEvent: <T extends keyof ClientEvents>(event: T, ctx: ClientEvents[T]) => void
} | null>(null)

type ServerEventHandler<T extends keyof ServerEvents> = (ctx: ServerEvents[T]) => void
type ServerEventHandlers = {
  [K in keyof ServerEvents]?: ServerEventHandler<K>[]
}

export const WebSocketProvider = ({ children }: { children: ReactNode }) => {
  const [clientId, setClientId] = useState<string | null>(null)
  const [readyState, setReadyState] = useState<number>(WebSocket.CLOSED)
  const [error, setError] = useState<string | null>(null)
  
  const wsRef = useRef<WebSocketClient | null>(null)
  const handlersRef = useRef<ServerEventHandlers>({})
  const didConnectRef = useRef(false)

  const isMountedRef = useRef(true)
  const reconnectTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const wsUrl = process.env.NEXT_PUBLIC_WS_URL

  const onEvent = useCallback(<T extends keyof ServerEvents>(event: T, handler: (ctx: ServerEvents[T]) => void) => {
    if (!handlersRef.current) {
      return () => {}
    }

    if (!handlersRef.current[event]) {
      (handlersRef.current[event] as unknown as ServerEventHandler<T>[]) = []
    }
    
    handlersRef.current[event]!.push(handler)

    return () => {
      if (handlersRef.current && handlersRef.current[event]) {
        (handlersRef.current[event] as unknown as ServerEventHandler<T>[]) = (handlersRef.current[event] as ServerEventHandler<T>[]).filter(h => h !== handler)
      }
    }
  }, [])

  const sendEvent = useCallback(<T extends keyof ClientEvents>(event: T, ctx: ClientEvents[T]) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ event, ctx }))
    } else {
      console.log("[WebSocketProvider] WebSocket not connected. Event not sent:", event)
    }
  }, [])

  useEffect(() => {
    isMountedRef.current = true
    setError(null)

    if (!wsUrl || didConnectRef.current) return
    didConnectRef.current = true

    const connectWebSocket = () => {
      if (!didConnectRef.current) return

      if (wsRef.current && (wsRef.current.readyState === WebSocket.OPEN || wsRef.current.readyState === WebSocket.CONNECTING)) {
        console.log("[WebSocketProvider] Already connected or connecting, skipping new connection attempt.")
        return
      }
      
      if (wsRef.current && wsRef.current.readyState !== WebSocket.CLOSED) {
        console.log("[WebSocketProvider] Closing existing WebSocket before new connection.")
        wsRef.current.close(1000, "New connection attempt")
        return
      }

      if (!wsUrl) {
        console.error("[WebSocketProvider] No WS URL provided!!! Skipping connection attempt.")
        return
      }

      setReadyState(WebSocket.CONNECTING)

      const socket = new WebSocket(wsUrl) as WebSocketClient
      wsRef.current = socket

      socket.onopen = () => {
        if (!isMountedRef.current) return
        console.log("[WebSocketProvider] Connected!")
        setClientId(null)
        setReadyState(WebSocket.OPEN)
      }

      socket.onclose = (event) => {
        if (!isMountedRef.current) return
        console.log("[WebSocketProvider] Disconnected:", event.code, event.reason)
        setReadyState(WebSocket.CLOSED)

        if (event.code !== 1000) {
          console.log("[WebSocketProvider] Unexpected close. Reconnecting in 2s...")
          setTimeout(() => {
            connectWebSocket()
          }, 2000)
        }
      }

      socket.onerror = (error) => {
        if (!isMountedRef.current) return
        console.error("[WebSocketProvider] Error:", error)
      }

      socket.onmessage = (e) => {
        if (!isMountedRef.current) return
        let message

        try {
          message = JSON.parse(e.data.toString())
        } catch (err) {
          console.error("[WebSocketProvider] Failed to parse incoming message:", err)
          return
        }

        const { event, ctx } = message
        
        if (event === 'setId') {
          setClientId(ctx.id)
          console.log("[WebSocketProvider] Received client ID:", ctx.id)
          socket.id = ctx.id
          return
        }

        const handlers = handlersRef.current

        if (handlers && (event in handlers)) {
          const typedEvent = event as keyof ServerEvents
          const typedCtx = ctx as ServerEvents[typeof typedEvent]

          const eventHandlers = handlers[typedEvent] as ((ctx: ServerEvents[typeof typedEvent]) => void)[]

          eventHandlers.forEach(handler => handler(typedCtx))
        } else {
          console.warn(`[WebSocketProvider] Received message for unhandled event: ${event}`)
        }
      }
    }

    connectWebSocket()
    
    return () => {
      console.log("[WebSocketProvider] Cleaning up...")
      isMountedRef.current = false
      didConnectRef.current = false

      if (reconnectTimerRef.current) {
        clearTimeout(reconnectTimerRef.current)
        reconnectTimerRef.current = null
      }

      if (wsRef.current) {
        if (wsRef.current.readyState === WebSocket.OPEN) {
          wsRef.current.onclose = null
          wsRef.current.close(1000, "Component unmount")
        }

        wsRef.current = null
      }
    }
  }, [wsUrl])

  if (error && readyState !== WebSocket.OPEN) {
    return (
      <div className="h-dvh w-full flex flex-col items-center justify-center gap-4">
        <FancyCard className="flex gap-4">
          <LoaderCircle size={24} className="animate-spin" />
          <h1>Connecting to server...</h1>
        </FancyCard>
        <div className="flex gap-4">
          <FancyButton asChild>
            <Link href="/">
              Home
            </Link>
          </FancyButton>
          <FancyButton color="yellow" onClick={ () => { window.location.reload() } }>
            Retry
          </FancyButton>
        </div>
      </div>
    )
  }

  return (
    <WebSocketContext.Provider value={{ isConnected: readyState === WebSocket.OPEN, clientId, readyState, onEvent, sendEvent }}>
      <Disconnected />
      { children }
    </WebSocketContext.Provider>
  )
}

export const useWebSocket = () => {
  console.log("[WebSocketProvider] useWebSocket")
  const context = useContext(WebSocketContext)
  
  if (context === null) {
    throw new Error("useWebSocket must be used within a WebSocketProvider")
  }

  return context
}