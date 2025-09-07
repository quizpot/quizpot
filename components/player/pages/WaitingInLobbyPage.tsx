import React from 'react'
import Button from '../../ui/Button'
import { PlayerLobbyState } from '../../providers/PlayerLobbyStateProvider'
import { getBackgroundStyles } from '@/lib/misc/BackgroundStyles'

const WaitingInLobbyPage = ({ playerLobbyState }: { playerLobbyState: PlayerLobbyState }) => {
  if (!playerLobbyState) {
    return <></>
  }

  return (
    <section 
      className='flex flex-col gap-4 items-center justify-center h-screen w-full p-4'
      style={ getBackgroundStyles(playerLobbyState.theme.background) }
    >
      <h1 className='text-2xl font-semibold'>Waiting in Lobby</h1>
      <div className='flex flex-col gap-2 items-center'>
        <p>Lobby code: <span className='font-semibold'>{ playerLobbyState.code }</span></p>
        <p>{ playerLobbyState.player.name }: <span className='font-semibold'>{ playerLobbyState.player.score }</span></p>
      </div>
      <Button href='/' variant='red' >
        Leave
      </Button>
    </section>
  )
}

export default WaitingInLobbyPage