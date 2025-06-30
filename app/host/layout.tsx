import { LobbyProvider } from '@/components/host/LobbyProvider'
import { WebSocketProvider } from '@/components/quiz/WebSocket'
import React from 'react'

const HostLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <WebSocketProvider wsUrl='ws://localhost:3000/api/ws'>
      <LobbyProvider>
        { children }
      </LobbyProvider>
    </WebSocketProvider>
  )
}

export default HostLayout