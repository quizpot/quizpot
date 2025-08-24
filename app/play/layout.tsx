import ConnectionStatus from '@/components/ui/ConnectionStatus'
import { PlayerLobbyStateProvider } from '@/components/providers/PlayerLobbyStateProvider'
import { WebSocketProvider } from '@/components/providers/WebSocketProvider'
import React from 'react'

const PlayerLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <WebSocketProvider>
      <PlayerLobbyStateProvider>
        <ConnectionStatus />
        { children }
      </PlayerLobbyStateProvider>
    </WebSocketProvider>
  )
}

export default PlayerLayout