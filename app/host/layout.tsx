import { HostLobbyStateProvider } from '@/components/providers/HostLobbyStateProvider'
import { WebSocketProvider } from '@/components/providers/WebSocketProvider'
import DeviceScreenUnsupported from '@/components/ui/DeviceScreenUnsupported'
import React from 'react'

const HostLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <DeviceScreenUnsupported />
      <WebSocketProvider>
        <HostLobbyStateProvider>
          { children }
        </HostLobbyStateProvider>
      </WebSocketProvider>
    </>
  )
}

export default HostLayout