import React from 'react'
import { LobbyState } from '../providers/LobbyStateProvider'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const AnswerPage = ({ lobbyState }: { lobbyState: LobbyState }) => {
  return (
    <section className='flex flex-col gap-4 items-center justify-center h-screen w-full p-4'>
      <h1 className='text-2xl font-semibold'>Answer Page</h1>
    </section>
  )
}

export default AnswerPage