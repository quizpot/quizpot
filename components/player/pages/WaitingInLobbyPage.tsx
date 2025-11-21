import React from 'react'
import { PlayerLobbyState } from '../../providers/PlayerLobbyStateProvider'
import { getBackgroundStyles } from '@/lib/client/BackgroundStyles'
import { useTranslations } from 'next-intl'
import FancyCard from '@/components/ui/fancy-card'
import FancyButton from '@/components/ui/fancy-button'
import Link from 'next/link'

const WaitingInLobbyPage = ({ playerLobbyState }: { playerLobbyState: PlayerLobbyState }) => {
  const t = useTranslations('WaitingInLobbyPage')

  if (!playerLobbyState) {
    return <></>
  }

  return (
    <section 
      className='flex flex-col gap-4 items-center justify-center h-screen w-full p-4'
      style={ getBackgroundStyles(playerLobbyState.theme.background) }
    >
      <FancyCard color='white' className='p-4 flex flex-col gap-4 text-center'>
        <h1 className='text-2xl font-semibold'>{ t('title') }</h1>
        <div className='flex flex-col gap-2 items-center'>
          <p>{ t('lobbyCode') }: <span className='font-semibold'>{ playerLobbyState.code }</span></p>
          <p>{ playerLobbyState.player.name }: <span className='font-semibold'>{ playerLobbyState.player.score }</span></p>
        </div>
        <FancyButton color='red'>
          <Link href='/'>
            { t('leave') }
          </Link>
        </FancyButton>
      </FancyCard>
    </section>
  )
}

export default WaitingInLobbyPage