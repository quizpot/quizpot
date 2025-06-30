"use client"
import { WebSocketClient } from "@/app/api/ws/route"
import { createContext, ReactNode, useCallback, useContext, useEffect, useRef, useState } from "react"

const WebSocketContext = createContext<{
  ws: WebSocketClient | null
  setWs: (ws: WebSocketClient | null) => void
} | null>(null)

export const WebSocketProvider = ({ children, wsUrl }: { children: ReactNode, wsUrl: string }) => {
  const [ws, setWs] = useState<WebSocketClient | null>(null)
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const reconnectAttemptsRef = useRef<number>(0)

  const MAX_RECONNECT_ATTEMPTS = 10
  const RECONNECT_BASE_DELAY = 1000

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

    console.log(`[WebSocketProvider] Attempting to connect to: ${wsUrl} (Attempt ${reconnectAttemptsRef.current + 1})`)

    const socket = new WebSocket(wsUrl) as WebSocketClient

    socket.onopen = () => {
      console.log("[WebSocketProvider] Connected!")
      setWs(socket)
      reconnectAttemptsRef.current = 0
    }

    socket.onclose = (event) => {
      console.log("[WebSocketProvider] Disconnected:", event.code, event.reason)
      setWs(null)
      // Start reconnection process
      reconnectAttemptsRef.current++
      const delay = Math.min(RECONNECT_BASE_DELAY * Math.pow(2, reconnectAttemptsRef.current - 1), 30000)
      console.log(`[WebSocketProvider] Retrying connection in ${delay}ms...`)
      reconnectTimeoutRef.current = setTimeout(connectWebSocket, delay)
    }

    socket.onerror = (error) => {
      console.error("[WebSocketProvider] Error:", error)
    }

    socket.onmessage = (event) => {
      console.log("[WebSocketProvider] Received message:", event)

      const content = JSON.parse(event.data)

      if (content.type === 'id') {
        console.log("[WebSocketProvider] Received id:", content.id)
        socket.id = content.id
      }
    }
  }, [ws, wsUrl])

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
    <WebSocketContext.Provider value={{ ws, setWs }}>
      { children }
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