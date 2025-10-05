"use client"
import React, { useEffect } from 'react'
import QRCode from 'react-qr-code'
import PlayerKickButton from '../ui/PlayerKickButton'
import Button from '../../ui/Button'
import { useWebSocket } from '../../providers/WebSocketProvider'
import { useToast } from '../../ui/Toaster'
import { HostLobbyState } from '../../providers/HostLobbyStateProvider'
import { getBackgroundStyles } from '@/lib/client/BackgroundStyles'
import Card from '@/components/ui/Card'

const LobbyWaitingPage = ({ hostLobbyState }: { hostLobbyState: HostLobbyState }) => {
  const toast = useToast() 
  const { sendEvent, onEvent } = useWebSocket()

  useEffect(() => {
    const unsubscribeStartLobbyError = onEvent('startLobbyError', (ctx) => {
      toast(ctx.message, { variant: 'error' })
    })

    return () => {
      unsubscribeStartLobbyError()
    }
  }, [toast, onEvent])

  return (
    <section 
      className='flex flex-col gap-4 items-center justify-between h-screen w-full p-4'
      style={ getBackgroundStyles(hostLobbyState.theme.background) }
    >
      <div className='w-full flex gap-4 justify-between'>
        <Card className='flex flex-col gap-4'>
          <h1 className='text-4xl lg:text-6xl'>Lobby Code: <span className='font-semibold'>{ hostLobbyState.code }</span></h1>
          <Button onClick={() => {
            sendEvent('startLobby', {})
          }} variant='green' className='text-2xl' >
            Start
          </Button>
        </Card>
        <Card>
          <QRCode value={ window.location.host + `/play?code=${ hostLobbyState.code }` } className='p-4' />
        </Card>
      </div>
      <Card className='w-full flex gap-4 flex-wrap items-center'>
        <p className='text-2xl'>Players: <span className='font-semibold select-text'>{ hostLobbyState.players.length }</span></p>
        {
          hostLobbyState.players.length > 0 && hostLobbyState.players.map((player, index) => (
            <PlayerKickButton key={ index } player={ player } variant={ 'blue' } />
          ))
        }
      </Card>
    </section>
  )
}

export default LobbyWaitingPage