import { PlayerLobbyState } from '@/components/providers/PlayerLobbyStateProvider'
import Button from '@/components/ui/ButtonOld'
import { getBackgroundStyles } from '@/lib/client/BackgroundStyles'
import React from 'react'

const SlidePage = ({ playerLobbyState }: { playerLobbyState: PlayerLobbyState }) => {
  return (
    <section 
      className='flex flex-col gap-4 items-center justify-center max-h-screen h-screen w-full p-4'
      style={ getBackgroundStyles(playerLobbyState.theme.background) }
    >
      <Button variant='gray' className='text-center text-4xl font-semibold w-full py-4 px-4'>
        Look at the slide!
      </Button>
    </section>
  )
}

export default SlidePage