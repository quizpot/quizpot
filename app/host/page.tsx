"use client"
import AnswerPage from '@/components/host/pages/AnswerPage'
import AnswersPage from '@/components/host/AnswersPage'
import EndPage from '@/components/host/EndPage'
import LobbyWaitingPage from '@/components/host/pages/LobbyWaitingPage'
import HostQuizPage from '@/components/host/pages/HostQuizPage'
import QuestionPage from '@/components/host/pages/QuestionPage'
import ScorePage from '@/components/host/ScorePage'
import { useHostLobbyState } from '@/components/providers/HostLobbyStateProvider'
import Button from '@/components/ui/Button'
import React from 'react'

const HostPage = () => {
  const hostLobbyState = useHostLobbyState().hostLobbyState

  if (!hostLobbyState) {
    return <HostQuizPage />
  }

  if (hostLobbyState.status === 'waiting') {
    return <LobbyWaitingPage hostLobbyState={ hostLobbyState } />
  }

  if (hostLobbyState.status === 'question') {
    return <QuestionPage hostLobbyState={ hostLobbyState } />
  }

  if (hostLobbyState.status === 'answer') {
    return <AnswerPage hostLobbyState={ hostLobbyState } />
  }

  if (hostLobbyState.status === 'answers') {
    return <AnswersPage hostLobbyState={ hostLobbyState } />
  }

  if (hostLobbyState.status === 'score') {
    return <ScorePage hostLobbyState={ hostLobbyState } />
  }

  if (hostLobbyState.status === 'end') {
    return <EndPage hostLobbyState={ hostLobbyState } />
  }

  return (
    <section className='flex flex-col items-center justify-center gap-4 h-screen w-full p-4'>
      <h1 className='text-2xl font-semibold'>Unknown Lobby State</h1>
      <Button href='/' variant='yellow'>
        Leave
      </Button>
    </section>
  )
}

export default HostPage