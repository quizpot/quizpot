import React from 'react'
import { HostLobbyState } from '../providers/HostLobbyStateProvider'

const EndPage = ({ hostLobbyState }: { hostLobbyState: HostLobbyState }) => {
  return (
    <section className='flex flex-col gap-4 items-center justify-center h-screen w-full p-4'>
      {
        hostLobbyState.players.map((player, index) => (
          <p key={index}>{ player.name }: { player.score }</p>
        ))
      }
    </section>
  )
}

export default EndPage