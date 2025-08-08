"use client"
import React from 'react'
import { useLobbyState } from '../providers/LobbyStateProvider'

const LobbyWaitingPage = () => {
  const lobbyState = useLobbyState().lobbyState

  if (!lobbyState) {
    return <></>
  }

  return (
    <section className='flex flex-col gap-4 items-center justify-center h-screen w-full'>
      <h1>Code: { lobbyState.code }</h1>
      <p>Players: { lobbyState.players.length }</p>
      <div className='flex flex-col gap-4'>
        {
          lobbyState.players.length > 0 && lobbyState.players.map((player, index) => (
            <p key={ index }>{ player.name }: { player.score }</p>
          ))
        }
      </div>
    </section>
  )
}

export default LobbyWaitingPage