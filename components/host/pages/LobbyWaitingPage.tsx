"use client"
import React, { useEffect } from 'react'
import QRCode from 'react-qr-code'
import PlayerKickButton from '../ui/PlayerKickButton'
import { useWebSocket } from '../../providers/WebSocketProvider'
import { useToast } from '../../ui/toaster'
import { HostLobbyState } from '../../providers/HostLobbyStateProvider'
import { getBackgroundStyles } from '@/lib/client/BackgroundStyles'
import { useTranslations } from 'next-intl'
import FancyButton from '@/components/ui/fancy-button'
import FancyCard from '@/components/ui/fancy-card'
import HostLayout from './HostLayout'

const LobbyWaitingPage = ({ hostLobbyState }: { hostLobbyState: HostLobbyState }) => {
  const t = useTranslations('LobbyWaitingPage')
  const btn = useTranslations('Buttons')
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
    <HostLayout>
      lobbywaitingpage
    </HostLayout>
  )

  return (
    <section 
      className='flex flex-col gap-4 items-center justify-between h-screen w-full p-4'
      style={ getBackgroundStyles(hostLobbyState.theme.background) }
    >
      <div className='w-full flex gap-4 justify-between'>
        <FancyCard color='white' className='flex flex-col gap-4 p-4 mb-auto'>
          <h1 className='text-4xl lg:text-6xl'>{ t('code') }: <span className='font-semibold'>{ hostLobbyState.code }</span></h1>
          <FancyButton onClick={() => {
            sendEvent('startLobby', {})
          }} color='green' className='text-2xl' >
            { btn('start') }
          </FancyButton>
        </FancyCard>
        <FancyButton color='white'>
          <QRCode value={ window.location.host + `/play?code=${ hostLobbyState.code }` } className='p-4' />
        </FancyButton>
      </div>
      <FancyCard color='white' className='w-full flex gap-4 p-4 flex-wrap items-center'>
        <p className='text-2xl'>{ t('players') }: <span className='font-semibold select-text'>{ hostLobbyState.players.length }</span></p>
        {
          hostLobbyState.players.length > 0 && hostLobbyState.players.map((player, index) => (
            <PlayerKickButton key={ index } player={ player } color={ 'blue' } />
          ))
        }
      </FancyCard>
    </section>
  )
}

export default LobbyWaitingPage