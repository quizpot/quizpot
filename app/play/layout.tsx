import { PlayerLobbyStateProvider } from '@/components/providers/PlayerLobbyStateProvider'
import { WebSocketProvider } from '@/components/providers/WebSocketProvider'
import Disconnected from '@/components/ui/disconnected'
import React, { Suspense } from 'react'

const PlayerLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <WebSocketProvider>
      <Disconnected />
      <PlayerLobbyStateProvider>
        <Suspense>
          { children }
        </Suspense>
      </PlayerLobbyStateProvider>
    </WebSocketProvider>
  )
}

export default PlayerLayout