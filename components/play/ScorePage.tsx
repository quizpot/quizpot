import React from 'react'
import { LobbyState } from '../providers/LobbyStateProvider'

const ScorePage = ({ lobbyState }: { lobbyState: LobbyState }) => {
  let player = lobbyState.players.find(player => player.name === lobbyState.player.name)

  if (!player) {
    player = {
      name: 'Unknown',
      score: 0
    }
  }

  return (
    <section className='flex flex-col gap-4 items-center justify-center h-screen w-full p-4'>
      <p>{ player.name }: { player.score }</p>
    </section>
  )
}

export default ScorePage