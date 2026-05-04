"use client"
import { useEffect } from 'react'
import QRCode from 'react-qr-code'
import PlayerKickButton from '../ui/PlayerKickButton'
import { useToast } from '../../ui/toaster'
import { useTranslations } from 'next-intl'
import FancyButton from '@/components/ui/fancy-button'
import FancyCard from '@/components/ui/fancy-card'
import HostStatusLayout from '../layouts/HostStatusLayout'
import { HostLobbyState } from '@quizpot/quizcore'
import { useWebSocket } from '@/components/providers/ws-provider'

const LobbyWaitingPage = ({ hostLobbyState }: { hostLobbyState: HostLobbyState }) => {
  const t = useTranslations('LobbyWaitingPage')
  const btn = useTranslations('Buttons')
  const toast = useToast() 
  const { sendEvent, onEvent } = useWebSocket()

  useEffect(() => {
    const unsubscribeStartLobbyError = onEvent('SERVER_ERROR', (ctx) => {
      toast(ctx.payload.message, { variant: 'error' })
    })

    return () => {
      unsubscribeStartLobbyError()
    }
  }, [toast, onEvent])

  return (
    <div className='flex flex-col gap-6 px-4 pt-4 h-full overflow-y-hidden'>
      <div className='flex gap-4 justify-between'>
        <div className='flex flex-col gap-6 w-full'>
          <FancyCard className='w-full flex flex-col gap-4 p-4 flex-wrap  items-center justify-center h-full'>
            <h1 className='text-4xl lg:text-6xl'>{ t('code') }: <span className='font-semibold'>{ hostLobbyState.code }</span></h1>
          </FancyCard>
          <FancyButton onClick={() => {
            sendEvent('START_LOBBY', {})
          }} color='green' className='text-2xl' >
            { btn('start') }
          </FancyButton>
        </div>
        <FancyCard color='white' className='p-4 bg-white'>
          <QRCode value={ window.location.toString().replace('host', 'play') } />
        </FancyCard>
      </div>
      <div className='flex gap-x-4 gap-y-6 flex-wrap h-fit overflow-y-scroll pb-4'>
        <FancyCard className='w-fit'> 
          <p className='text-2xl'>{ t('players') }: <span className='font-semibold select-text'>{ hostLobbyState.players.length }</span></p>
        </FancyCard>
        {
          hostLobbyState.players.length !== 0 && (
            hostLobbyState.players.map((player, index) => (
              <PlayerKickButton key={ index } player={ player } />
            ))
          )
        }
      </div>
    </div>
  )
}

export default LobbyWaitingPage