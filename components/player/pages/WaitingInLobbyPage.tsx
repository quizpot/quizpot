import React from 'react'
import Button from '../../ui/ButtonOld'
import { PlayerLobbyState } from '../../providers/PlayerLobbyStateProvider'
import { getBackgroundStyles } from '@/lib/client/BackgroundStyles'
import Card from '@/components/ui/Card'

const WaitingInLobbyPage = ({ playerLobbyState }: { playerLobbyState: PlayerLobbyState }) => {
  if (!playerLobbyState) {
    return <></>
  }

  return (
    <section 
      className='flex flex-col gap-4 items-center justify-center h-screen w-full p-4'
      style={ getBackgroundStyles(playerLobbyState.theme.background) }
    >
      <Card className='p-4 flex flex-col gap-4 text-center'>
        <h1 className='text-2xl font-semibold'>Waiting in Lobby</h1>
        <div className='flex flex-col gap-2 items-center'>
          <p>Lobby code: <span className='font-semibold'>{ playerLobbyState.code }</span></p>
          <p>{ playerLobbyState.player.name }: <span className='font-semibold'>{ playerLobbyState.player.score }</span></p>
        </div>
        <Button href='/' variant='red' >
          Leave
        </Button>
      </Card>
    </section>
  )
}

export default WaitingInLobbyPage