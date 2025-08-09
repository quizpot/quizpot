import ConnectionStatus from '@/components/play/ConnectionStatus'
import { LobbyStateProvider } from '@/components/providers/LobbyStateProvider'
import { WebSocketProvider } from '@/components/ws/WebSocket'
import React from 'react'

const PlayLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <WebSocketProvider>
      <LobbyStateProvider>
        <ConnectionStatus />
        { children }
      </LobbyStateProvider>
    </WebSocketProvider>
  )
}

export default PlayLayout