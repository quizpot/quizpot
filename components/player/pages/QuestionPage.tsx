import React from 'react'
import { PlayerLobbyState } from '../../providers/PlayerLobbyStateProvider'
import { getBackgroundStyles } from '@/lib/client/BackgroundStyles'
import FancyCard from '@/components/ui/fancy-card'

const QuestionPage = ({ playerLobbyState }: { playerLobbyState: PlayerLobbyState }) => {
  return (
    <section 
      className='flex flex-col gap-4 items-center justify-center h-screen w-full'
      style={ getBackgroundStyles(playerLobbyState.theme.background) }
    >
      <FancyCard color='white' className='text-center text-4xl font-semibold py-4 px-4 mx-auto'>
        { playerLobbyState.currentQuestionNumber }
      </FancyCard>
    </section>
  )
}

export default QuestionPage