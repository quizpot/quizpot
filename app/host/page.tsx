"use client"
import AnswerPage from '@/components/host/pages/AnswerPage'
import AnswersPage from '@/components/host/pages/AnswersPage'
import EndPage from '@/components/host/pages/EndPage'
import LobbyWaitingPage from '@/components/host/pages/LobbyWaitingPage'
import HostQuizPage from '@/components/host/pages/HostQuizPage'
import QuestionPage from '@/components/host/pages/QuestionPage'
import ScoreboardPage from '@/components/host/pages/ScoreboardPage'
import { useHostLobbyState } from '@/components/providers/HostLobbyStateProvider'
import React from 'react'
import SlidePage from '@/components/host/pages/SlidePage'
import FancyButton from '@/components/ui/fancy-button'
import Link from 'next/link'

const HostPage = () => {
  const hostLobbyState = useHostLobbyState().hostLobbyState

  if (!hostLobbyState) {
    return <HostQuizPage />
  }

  if (hostLobbyState.status === 'waiting') {
    return <LobbyWaitingPage hostLobbyState={ hostLobbyState } />
  }

  if (hostLobbyState.status === 'slide') {
    return <SlidePage hostLobbyState={ hostLobbyState } />
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
    return <ScoreboardPage hostLobbyState={ hostLobbyState } />
  }

  if (hostLobbyState.status === 'end') {
    return <EndPage hostLobbyState={ hostLobbyState } />
  }

  return (
    <section className='flex flex-col items-center justify-center gap-4 h-screen w-full p-4'>
      <h1 className='text-2xl font-semibold'>Unknown Lobby State</h1>
      <FancyButton color='yellow' asChild>
        <Link href='/'>
          Leave
        </Link>
      </FancyButton>
    </section>
  )
}

export default HostPage