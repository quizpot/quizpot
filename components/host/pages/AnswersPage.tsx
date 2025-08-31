import React from 'react'
import { HostLobbyState } from '../../providers/HostLobbyStateProvider'

const AnswersPage = ({ hostLobbyState }: { hostLobbyState: HostLobbyState }) => {
  return (
    <section className='flex flex-col gap-4 items-center justify-center h-screen w-full p-4'>
      <p>Answer count: { hostLobbyState.answers.length }</p>
    </section>
  )
}

export default AnswersPage