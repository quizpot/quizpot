/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { WebSocketClient } from "@/lib/server/managers/WSClientManager"
import { createContext, ReactNode, useCallback, useContext, useEffect, useRef, useState } from "react"

const WebSocketContext = createContext<{
  isConnected: boolean
  clientId: string | null
  readyState: number
  onEvent: (event: string, handler: (ctx: any) => void) => () => void
  sendEvent: (event: string, ctx: any) => void
} | null>(null)

export const WebSocketProvider = ({ children }: { children: ReactNode }) => {
  const [clientId, setClientId] = useState<string | null>(null)
  const [readyState, setReadyState] = useState<number>(WebSocket.CLOSED)
  
  const wsRef = useRef<WebSocketClient | null>(null)
  const handlersRef = useRef<{ [key: string]: ((ctx: any) => void)[] }>({})
  const didConnectRef = useRef(false)

  const wsUrl = process.env.NEXT_PUBLIC_WS_URL

  // Function to register a handler for an event
  const onEvent = useCallback((event: string, handler: (ctx: any) => void) => {
    // Access the handlers from the ref
    if (!handlersRef.current[event]) {
      handlersRef.current[event] = []
    }

    handlersRef.current[event].push(handler)

    return () => {
      handlersRef.current[event] = handlersRef.current[event].filter(h => h !== handler)
    }
  }, [])

  // Function to send a structured event to the server
  const sendEvent = useCallback((event: string, ctx: any) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ event, ctx }))
    } else {
      console.log("[WebSocketProvider] WebSocket not connected. Event not sent:", event)
    }
  }, [])

  useEffect(() => {
    if (!wsUrl || didConnectRef.current) {
      return
    }

    didConnectRef.current = true

    const connectWebSocket = () => {
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
        console.log("[WebSocketProvider] Connected!")
        setClientId(null)
        setReadyState(WebSocket.OPEN)
      }

      socket.onclose = (event) => {
        console.log("[WebSocketProvider] Disconnected:", event.code, event.reason)
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

        if (handlersRef.current[event]) {
          handlersRef.current[event].forEach(handler => handler(ctx))
        } else {
          console.warn(`[WebSocketProvider] Received message for unhandled event: ${event}`)
        }
      }
    }

    connectWebSocket()
    
    return () => {
      didConnectRef.current = false

      if (wsRef.current) {
        if (wsRef.current.readyState === WebSocket.OPEN) {
          wsRef.current.close(1000, "Component unmount")
        }

        wsRef.current = null
      }
    }
  }, [wsUrl])

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