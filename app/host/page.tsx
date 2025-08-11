"use client"
import AnswerPage from '@/components/host/AnswerPage'
import EndPage from '@/components/host/EndPage'
import LobbyWaitingPage from '@/components/host/LobbyWaitingPage'
import QuestionPage from '@/components/host/QuestionPage'
import ScorePage from '@/components/host/ScorePage'
import StateWaitingPage from '@/components/host/StateWaitingPage'
import UploadQuizPage from '@/components/host/UploadQuizPage'
import { useLobbyState } from '@/components/providers/LobbyStateProvider'
import Button from '@/components/ui/Button'
import React from 'react'

const HostPage = () => {
  const lobbyState = useLobbyState().lobbyState

  if (!lobbyState) {
    return <UploadQuizPage />
  }
  
  if (!lobbyState.started) {
    return <LobbyWaitingPage />
  }

  if (lobbyState.state === 'waiting') {
    return <StateWaitingPage />
  }

  if (lobbyState.state === 'question') {
    return <QuestionPage lobbyState={ lobbyState } />
  }

  if (lobbyState.state === 'answer') {
    return <AnswerPage lobbyState={ lobbyState } />
  }

  if (lobbyState.state === 'score') {
    return <ScorePage lobbyState={ lobbyState } />
  }

  if (lobbyState.state === 'end') {
    return <EndPage lobbyState={ lobbyState } />
  }

  return (
    <section className='flex flex-col items-center justify-center gap-4 h-screen w-full p-4'>
      <h1 className='text-2xl font-semibold'>Unknown Lobby State</h1>
      <Button href='/' variant='yellow'>
        Home
      </Button>
    </section>
  )
}

export default HostPage