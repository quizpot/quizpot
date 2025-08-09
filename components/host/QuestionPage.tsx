import React from 'react'
import { LobbyState } from '../providers/LobbyStateProvider'

const QuestionPage = ({ lobbyState }: { lobbyState: LobbyState }) => {
  return (
    <section className='flex flex-col gap-4 items-center justify-center h-screen w-full p-4'>
      <p>Question { lobbyState.currentQuestionIndex + 1 }</p>
      <h1 className='text-4xl font-semibold'>{ lobbyState.currentQuestion?.question }</h1>
    </section>
  )
}

export default QuestionPage