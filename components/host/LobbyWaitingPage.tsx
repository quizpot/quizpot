"use client"
import React, { useEffect } from 'react'
import QRCode from 'react-qr-code'
import PlayerKickButton from './PlayerKickButton'
import Button from '../ui/Button'
import { useWebSocket } from '../providers/WebSocketProvider'
import { useToast } from '../ui/Toaster'
import { actionButtonVariants } from '../ui/ActionButton'
import { useHostLobbyState } from '../providers/HostLobbyStateProvider'

const LobbyWaitingPage = () => {
  const addToast = useToast()
  const hostLobbyState = useHostLobbyState().hostLobbyState
  const { sendEvent, onEvent } = useWebSocket()

  useEffect(() => {
    const unsubscribeStartLobbyError = onEvent('startLobbyError', (ctx) => {
      addToast({ message: ctx.error, type: 'error' })
    })

    return () => {
      unsubscribeStartLobbyError()
    }
  }, [addToast, onEvent])

  if (!hostLobbyState) {
    return <></>
  }

  return (
    <section className='flex flex-col gap-4 items-center justify-between h-screen w-full p-4'>
      <div className='w-full flex gap-4 justify-between'>
        <div className='flex flex-col gap-4'>
          <h1 className='text-4xl lg:text-6xl'>Lobby Code: <span className='font-semibold'>{ hostLobbyState.code }</span></h1>
          <Button onClick={() => {
            sendEvent('startLobby', {})
          }} variant='green' className='text-2xl' >
            Start
          </Button>
        </div>
        <div className=''>
          <QRCode value={window.location.host + `/play?code=${hostLobbyState.code}`} />
        </div>
      </div>
      <div className='w-full flex flex-col gap-4'>
        <p className='text-2xl'>Players: <span className='font-semibold'>{ hostLobbyState.players.length }</span></p>
        <div className='flex gap-4 flex-wrap'>
          {
            hostLobbyState.players.length > 0 && hostLobbyState.players.map((player, index) => (
              <PlayerKickButton key={ index } player={ player } variant={actionButtonVariants[Math.floor(Math.random() * actionButtonVariants.length)]} />
            ))
          }
        </div>
      </div>
    </section>
  )
}

export default LobbyWaitingPage