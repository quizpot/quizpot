import React from 'react'
import { PlayerLobbyState } from '../../providers/PlayerLobbyStateProvider'
import { getBackgroundStyles } from '@/lib/client/BackgroundStyles'
import FancyCard from '@/components/ui/fancy-card'
import { useTranslations } from 'next-intl'

const AnswersPage = ({ playerLobbyState }: { playerLobbyState: PlayerLobbyState }) => {
  const t = useTranslations('AnswersPage')

  return (
    <section 
      className='flex flex-col gap-4 items-center justify-center h-screen w-full'
      style={ getBackgroundStyles(playerLobbyState.theme.background) }
    >
      <FancyCard color='white' className='text-center text-4xl font-semibold py-4 px-4 mx-auto'>
        { playerLobbyState.correctAnswer ? t('correct') : t('incorrect') }
      </FancyCard>
    </section>
  )
}

export default AnswersPage