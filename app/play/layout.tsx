import ConnectionStatus from '@/components/ui/ConnectionStatus'
import { PlayerLobbyStateProvider } from '@/components/providers/PlayerLobbyStateProvider'
import { WebSocketProvider } from '@/components/providers/WebSocketProvider'
import React, { Suspense } from 'react'

const PlayerLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <WebSocketProvider>
      <PlayerLobbyStateProvider>
        <ConnectionStatus />
        <Suspense>
          { children }
        </Suspense>
      </PlayerLobbyStateProvider>
    </WebSocketProvider>
  )
}

export default PlayerLayout