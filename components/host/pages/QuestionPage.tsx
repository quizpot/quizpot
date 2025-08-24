import React from 'react'
import { HostLobbyState } from '../../providers/HostLobbyStateProvider'

const QuestionPage = ({ hostLobbyState }: { hostLobbyState: HostLobbyState }) => {
  return (
    <section className='flex flex-col gap-4 items-center justify-center h-screen w-full p-4'>
      <p>Question { hostLobbyState.currentQuestionNumber }</p>
      <h1 className='text-4xl font-semibold'>{ hostLobbyState.currentQuestion?.question }</h1>
    </section>
  )
}

export default QuestionPage