import { LobbyProvider } from '@/components/host/LobbyProvider'
import ConnectionStatus from '@/components/quiz/ConnectionStatus'
import { WebSocketProvider } from '@/components/ws/WebSocket'
import React from 'react'

const HostLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <WebSocketProvider>
      <LobbyProvider>
        <ConnectionStatus />
        { children }
      </LobbyProvider>
    </WebSocketProvider>
  )
}

export default HostLayout