import React from 'react'
import { HostLobbyState } from '../../providers/HostLobbyStateProvider'
import CurrentQuestionAnswer from '../ui/CurrentQuestionAnswer'

const AnswerPage = ({ hostLobbyState }: { hostLobbyState: HostLobbyState }) => {
  if (!hostLobbyState.currentQuestion) return <></>

  return (
    <section className='flex flex-col gap-4 items-center justify-between h-screen w-full p-4'>
      <h1 className='text-4xl font-semibold'>{ hostLobbyState.currentQuestion.question }</h1>
      <CurrentQuestionAnswer currentQuestion={ hostLobbyState.currentQuestion } />
    </section>
  )
}

export default AnswerPage