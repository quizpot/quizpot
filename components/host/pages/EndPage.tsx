import React from 'react'
import { HostLobbyState } from '../../providers/HostLobbyStateProvider'
import { getBackgroundStyles } from '@/lib/client/BackgroundStyles'
import Button from '@/components/ui/Button'

const EndPage = ({ hostLobbyState }: { hostLobbyState: HostLobbyState }) => {
  return (
    <section 
      className='flex flex-col gap-4 justify-between h-screen w-full p-4'
      style={ getBackgroundStyles(hostLobbyState.theme.background) }
    >
      <Button variant='gray' className='text-center text-4xl font-semibold w-full py-4 px-4'>
        Results
      </Button>
      <div className='flex flex-col gap-4 p-4'>
        {
          hostLobbyState.players.map((player, index) => (
            <div key={index} className='flex justify-between items-center p-4 bg-white rounded-lg text-4xl'>
              <h1>{ player.name }</h1>
              <span>{ player.score }</span>
            </div>
          ))
        }
      </div>
      <div></div>
    </section>
  )
}

export default EndPage