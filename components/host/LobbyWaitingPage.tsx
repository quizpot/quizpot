"use client"
import React, { useEffect } from 'react'
import { useLobbyState } from '../providers/LobbyStateProvider'
import QRCode from 'react-qr-code'
import PlayerKickButton from './PlayerKickButton'
import Button from '../ui/Button'
import { useWebSocket } from '../ws/WebSocket'
import { useToast } from '../ui/Toaster'

const LobbyWaitingPage = () => {
  const addToast = useToast()
  const lobbyState = useLobbyState().lobbyState
  const { sendEvent, onEvent } = useWebSocket()

  useEffect(() => {
    const unsubscribeStartLobbyError = onEvent('lobbyStartedError', ({ ctx }) => {
      addToast({ message: ctx.error, type: 'error' })
    })

    return () => {
      unsubscribeStartLobbyError()
    }
  }, [addToast, onEvent])

  if (!lobbyState) {
    return <></>
  }

  return (
    <section className='flex flex-col gap-4 items-center justify-between h-screen w-full p-4'>
      <div className='w-full flex gap-4 justify-between'>
        <div className='flex flex-col gap-4'>
          <h1 className='text-4xl lg:text-6xl'>Lobby Code: <span className='font-semibold'>{ lobbyState.code }</span></h1>
          <Button onClick={() => {
            sendEvent('startLobby', {})
          }} variant='green' className='text-2xl' >
            Start
          </Button>
        </div>
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