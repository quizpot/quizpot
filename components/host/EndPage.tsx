import React from 'react'
import { LobbyState } from '../providers/LobbyStateProvider'

const EndPage = ({ lobbyState }: { lobbyState: LobbyState }) => {
  return (
    <section className='flex flex-col gap-4 items-center justify-center h-screen w-full p-4'>
      {
        lobbyState.players.map((player, index) => (
          <p key={index}>{ player.name }: { player.score }</p>
        ))
      }
    </section>
  )
}

export default EndPage