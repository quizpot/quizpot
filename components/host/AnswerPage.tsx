import React from 'react'
import { HostLobbyState } from '../providers/HostLobbyStateProvider'

const AnswerPage = ({ hostLobbyState }: { hostLobbyState: HostLobbyState }) => {
  return (
    <section className='flex flex-col gap-4 items-center justify-between h-screen w-full p-4'>
      <h1 className='text-4xl font-semibold'>{ hostLobbyState.currentQuestion.question }</h1>
      <div>
        {
          hostLobbyState.currentQuestion?.questionType === 'multipleChoice' && hostLobbyState.currentQuestion.choices.map((answer, index) => (
            <p key={index}>{ answer.text }</p>
          ))
        }
      </div>
    </section>
  )
}

export default AnswerPage