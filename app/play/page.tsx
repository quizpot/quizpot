import ConnectionStatus from '@/components/play/ConnectionStatus'
import { LobbyStateProvider } from '@/components/providers/LobbyStateProvider'
import { WebSocketProvider } from '@/components/ws/WebSocket'
import React, { Suspense } from 'react'
import PlayPageClient from './page.client'

const PlayPage = () => {
  return (
    <WebSocketProvider>
      <LobbyStateProvider>
        <ConnectionStatus />
        <Suspense>
          <PlayPageClient />
        </Suspense>
      </LobbyStateProvider>
    </WebSocketProvider>
  )
}

export default PlayPage