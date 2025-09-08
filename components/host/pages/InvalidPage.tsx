import { HostLobbyState } from '@/components/providers/HostLobbyStateProvider'
import Button from '@/components/ui/Button'
import { getBackgroundStyles } from '@/lib/misc/BackgroundStyles'
import React from 'react'

const InvalidPage = ({ hostLobbyState, message }: { hostLobbyState: HostLobbyState, message: string }) => {
  return (
    <section 
      className='flex flex-col gap-4 items-center justify-center max-h-screen h-screen w-full p-4'
      style={ getBackgroundStyles(hostLobbyState.theme.background) }
    >
      <Button variant='gray' className='text-center text-4xl font-semibold w-full py-4 px-4'>
        { message }
      </Button>
    </section>
  )
}

export default InvalidPage