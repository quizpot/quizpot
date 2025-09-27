import React from 'react'
import { PlayerLobbyState } from '../../providers/PlayerLobbyStateProvider'
import { getBackgroundStyles } from '@/lib/client/BackgroundStyles'

const QuestionPage = ({ playerLobbyState }: { playerLobbyState: PlayerLobbyState }) => {
  return (
    <section 
      className='flex flex-col gap-4 items-center justify-center h-screen w-full'
      style={ getBackgroundStyles(playerLobbyState.theme.background) }
    >
      <h1 className='text-4xl font-semibold bg-white text-black w-full p-4 text-center'>Question { playerLobbyState.currentQuestionNumber }</h1>
    </section>
  )
}

export default QuestionPage