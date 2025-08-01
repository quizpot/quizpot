/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { WebSocketClient } from "@/lib/managers/WSClientManager" 
import { createContext, ReactNode, useCallback, useContext, useEffect, useRef, useState } from "react"

const WebSocketContext = createContext<{
  isConnected: boolean
  clientId: string | null
  readyState: number
  onEvent: (event: string, handler: (ctx: any) => void) => () => void
  sendEvent: (event: string, ctx: any) => void
} | null>(null)

// A dictionary to store client-side event handlers
const handlers: { [key: string]: ((ctx: any) => void)[] } = {}

export const WebSocketProvider = ({ children, wsUrl }: { children: ReactNode, wsUrl: string }) => {
  const [ws, setWs] = useState<WebSocketClient | null>(null)
  const [clientId, setClientId] = useState<string | null>(null)
  const [readyState, setReadyState] = useState<number>(WebSocket.CLOSED)
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const reconnectAttemptsRef = useRef<number>(0)

  const MAX_RECONNECT_ATTEMPTS = 10
  const RECONNECT_BASE_DELAY = 1000

  // Function to register a handler for an event
  const onEvent = useCallback((event: string, handler: (ctx: any) => void) => {
    if (!handlers[event]) {
      handlers[event] = []
    }
    handlers[event].push(handler)

    // Return a function to unregister the handler
    return () => {
      handlers[event] = handlers[event].filter(h => h !== handler)
    }
  }, [])

  // Function to send a structured event to the server
  const sendEvent = useCallback((event: string, ctx: any) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ event, ctx }))
    } else {
      console.log("[WebSocketProvider] WebSocket not connected. Event not sent:", event)
    }
  }, [ws])

  const connectWebSocket = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current)
      reconnectTimeoutRef.current = null
    }

    if (reconnectAttemptsRef.current >= MAX_RECONNECT_ATTEMPTS) {
      console.warn("[WebSocketProvider] Max reconnect attempts reached. Stopping reconnection attempts.")
      return
    }

    if (ws && ws.url === wsUrl &&
        (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING)) {
        console.log("[WebSocketProvider] Already connected or connecting, skipping new connection attempt.")
        return
    }

    if (ws && ws.readyState !== WebSocket.CLOSED) {
      console.log("[WebSocketProvider] Closing existing WebSocket before new connection.")
      ws.close()
      setWs(null)
    }

    setReadyState(WebSocket.CONNECTING)

    console.log(`[WebSocketProvider] Attempting to connect to: ${wsUrl} (Attempt ${reconnectAttemptsRef.current + 1})`)

    const socket = new WebSocket(wsUrl) as WebSocketClient

    socket.onopen = () => {
      console.log("[WebSocketProvider] Connected!")
      setWs(socket)
      setClientId(null)
      reconnectAttemptsRef.current = 0
      setReadyState(WebSocket.OPEN)
    }

    socket.onclose = (event) => {
      console.log("[WebSocketProvider] Disconnected:", event.code, event.reason)
      setWs(null)
      // Start reconnection process
      reconnectAttemptsRef.current++
      const delay = Math.min(RECONNECT_BASE_DELAY * Math.pow(2, reconnectAttemptsRef.current - 1), 30000)
      console.log(`[WebSocketProvider] Retrying connection in ${delay}ms...`)
      reconnectTimeoutRef.current = setTimeout(connectWebSocket, delay)
      setReadyState(WebSocket.CLOSED)
    }

    socket.onerror = (error) => {
      console.error("[WebSocketProvider] Error:", error)
    }

    socket.onmessage = (e) => {
      let message

      try {
        message = JSON.parse(e.data)
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

      if (handlers[event]) {
        handlers[event].forEach(handler => handler(ctx))
      } else {
        console.warn(`[WebSocketProvider] Received message for unhandled event: ${event}`)
      }
    }
  }, [setWs, ws, wsUrl])

  useEffect(() => {
    connectWebSocket()

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current)
        reconnectTimeoutRef.current = null
      }

      if (ws && ws.readyState === WebSocket.OPEN) {
        console.log("[WebSocketProvider] Cleaning up: Closing WebSocket.")
        ws.close()
      }
    }
  }, [wsUrl, connectWebSocket, ws])

  return (
    <WebSocketContext.Provider value={{ isConnected: readyState === WebSocket.OPEN, clientId, readyState, onEvent, sendEvent }}>
      {children}
    </WebSocketContext.Provider>
  )
}

export const useWebSocket = () => {
  const context = useContext(WebSocketContext)
  
  if (context === null) {
    throw new Error("useWebSocket must be used within a WebSocketProvider")
  }

  return context
}