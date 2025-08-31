import React from 'react'
import { PlayerLobbyState } from '../providers/PlayerLobbyStateProvider'

const AnswersPage = ({ playerLobbyState }: { playerLobbyState: PlayerLobbyState }) => {
  return (
    <section className='flex flex-col gap-4 items-center justify-center h-screen w-full p-4'>
      <p>{ playerLobbyState.correctAnswer ? 'Correct' : 'Incorrect' }</p>
    </section>
  )
}

export default AnswersPage