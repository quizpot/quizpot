import { HostLobbyStateProvider } from '@/components/providers/HostLobbyStateProvider'
import { WebSocketProvider } from '@/components/providers/WebSocketProvider'
import Disconnected from '@/components/ui/disconnected'
import DeviceScreenUnsupported from '@/components/ui/unsupported-device-overlay'
import React from 'react'

const HostLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <DeviceScreenUnsupported />
      <WebSocketProvider>
        <Disconnected />
        <HostLobbyStateProvider>
          { children }
        </HostLobbyStateProvider>
      </WebSocketProvider>
    </>
  )
}

export default HostLayout