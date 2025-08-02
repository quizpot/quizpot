import { LobbyProvider } from '@/components/host/LobbyProvider'
import { WebSocketProvider } from '@/components/ws/WebSocket'
import React from 'react'

const PlayLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <WebSocketProvider>
      <LobbyProvider>
        { children }
      </LobbyProvider>
    </WebSocketProvider>
  )
}

export default PlayLayout