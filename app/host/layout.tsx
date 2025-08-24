import ConnectionStatus from '@/components/ui/ConnectionStatus'
import { HostLobbyStateProvider } from '@/components/providers/HostLobbyStateProvider'
import { WebSocketProvider } from '@/components/providers/WebSocketProvider'
import React from 'react'

const HostLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <WebSocketProvider>
      <HostLobbyStateProvider>
        <ConnectionStatus />
        { children }
      </HostLobbyStateProvider>
    </WebSocketProvider>
  )
}

export default HostLayout