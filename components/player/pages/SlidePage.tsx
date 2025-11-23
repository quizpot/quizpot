import { PlayerLobbyState } from '@/components/providers/PlayerLobbyStateProvider'
import FancyCard from '@/components/ui/fancy-card'
import { getBackgroundStyles } from '@/lib/client/BackgroundStyles'
import { useTranslations } from 'next-intl'
import React from 'react'

const SlidePage = ({ playerLobbyState }: { playerLobbyState: PlayerLobbyState }) => {
  const t = useTranslations('SlidePage')

  return (
    <section 
      className='flex flex-col gap-4 items-center justify-center max-h-screen h-screen w-full p-4'
      style={ getBackgroundStyles(playerLobbyState.theme.background) }
    >
      <FancyCard color='white' className='text-center text-4xl font-semibold mx-auto py-4 px-4'>
        { t('title') }
      </FancyCard>
    </section>
  )
}

export default SlidePage