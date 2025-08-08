"use client"
import React from 'react'
import { useLobbyState } from '../providers/LobbyStateProvider'
import QRCode from 'react-qr-code'
import PlayerKickButton from './PlayerKickButton'

const LobbyWaitingPage = () => {
  const lobbyState = useLobbyState().lobbyState

  if (!lobbyState) {
    return <></>
  }

  return (
    <section className='flex flex-col gap-4 items-center justify-between h-screen w-full p-4'>
      <div className='w-full flex gap-4 justify-between'>
        <h1 className='text-4xl lg:text-6xl'>Lobby Code: <span className='font-semibold'>{ lobbyState.code }</span></h1>
        <div className=''>
          <QRCode value={window.location.host + `/play?code=${lobbyState.code}`} />
        </div>
      </div>
      <div className='w-full flex flex-col gap-4'>
        <p className='text-2xl'>Players: <span className='font-semibold'>{ lobbyState.players.length }</span></p>
        <div className='flex gap-4 flex-wrap'>
          {
            lobbyState.players.length > 0 && lobbyState.players.map((player, index) => (
              <PlayerKickButton key={ index } player={ player } />
            ))
          }
        </div>
      </div>
    </section>
  )
}

export default LobbyWaitingPage