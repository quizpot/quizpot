import ConnectionStatus from '@/components/play/ConnectionStatus'
import { LobbyStateProvider } from '@/components/providers/LobbyStateProvider'
import { WebSocketProvider } from '@/components/ws/WebSocket'
import React, { Suspense } from 'react'

const PlayLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <WebSocketProvider>
      <LobbyStateProvider>
        <ConnectionStatus />
        <Suspense>
          { children }
        </Suspense>
      </LobbyStateProvider>
    </WebSocketProvider>
  )
}

export default PlayLayout