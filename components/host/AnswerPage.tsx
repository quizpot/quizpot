import React from 'react'
import { LobbyState } from '../providers/LobbyStateProvider'

const AnswerPage = ({ lobbyState }: { lobbyState: LobbyState }) => {
  return (
    <section className='flex flex-col gap-4 items-center justify-between h-screen w-full p-4'>
      <h1 className='text-4xl font-semibold'>{ lobbyState.currentQuestion?.question }</h1>
      <div>
        {
          lobbyState.currentQuestion?.questionType === 'multipleChoice' && lobbyState.currentQuestion?.choices.map((answer, index) => (
            <p key={index}>{ answer.text }</p>
          ))
        }
      </div>
    </section>
  )
}

export default AnswerPage