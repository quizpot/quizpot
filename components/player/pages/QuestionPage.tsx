import React from 'react'
import { PlayerLobbyState } from '../providers/PlayerLobbyStateProvider'

const QuestionPage = ({ playerLobbyState }: { playerLobbyState: PlayerLobbyState }) => {
  return (
    <section className='flex flex-col gap-4 items-center justify-center h-screen w-full p-4'>
      <h1 className='text-4xl font-semibold'>Question { playerLobbyState.currentQuestionNumber }</h1>
    </section>
  )
}

export default QuestionPage