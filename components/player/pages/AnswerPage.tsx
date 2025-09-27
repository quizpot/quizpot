import React from 'react'
import { PlayerLobbyState } from '../../providers/PlayerLobbyStateProvider'
import QuestionAnswers from '../ui/question/QuestionAnswers'
import { getBackgroundStyles } from '@/lib/client/BackgroundStyles'

const AnswerPage = ({ playerLobbyState }: { playerLobbyState: PlayerLobbyState }) => {
  if (!playerLobbyState.currentQuestion) {
    return <></>
  }
  
  return (
    <section 
      className='max-h-screen h-screen w-full'
      style={ getBackgroundStyles(playerLobbyState.theme.background) }
    >
      <QuestionAnswers question={ playerLobbyState.currentQuestion } />
    </section>
  )
}

export default AnswerPage