import { HostLobbyState } from '@/components/providers/HostLobbyStateProvider'
import FancyCard from '@/components/ui/fancy-card'
import { getBackgroundStyles } from '@/lib/client/BackgroundStyles'
import React from 'react'

const InvalidPage = ({ hostLobbyState, message }: { hostLobbyState: HostLobbyState, message: string }) => {
  return (
    <section 
      className='flex flex-col gap-4 items-center justify-center max-h-screen h-screen w-full p-4'
      style={ getBackgroundStyles(hostLobbyState.theme.background) }
    >
      <FancyCard color='white' className='text-center text-4xl font-semibold w-full py-4 px-4'>
        { message }
      </FancyCard>
    </section>
  )
}

export default InvalidPage