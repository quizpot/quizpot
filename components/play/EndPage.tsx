import React from 'react'
import { PlayerLobbyState } from '../providers/PlayerLobbyStateProvider'

const EndPage = ({ playerLobbyState }: { playerLobbyState: PlayerLobbyState }) => {
  return (
    <section className='flex flex-col gap-4 items-center justify-center h-screen w-full p-4'>
      <p>{ playerLobbyState.player.name }: { playerLobbyState.player.score }</p>
    </section>
  )
}

export default EndPage