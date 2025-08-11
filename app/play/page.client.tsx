"use client"
import AnswerPage from '@/components/play/AnswerPage'
import EndPage from '@/components/play/EndPage'
import JoinLobbyPage from '@/components/play/JoinLobbyPage'
import QuestionPage from '@/components/play/QuestionPage'
import ScorePage from '@/components/play/ScorePage'
import StateWaitingPage from '@/components/play/StateWaitingPage'
import WaitingInLobbyPage from '@/components/play/WaitingInLobbyPage'
import { useLobbyState } from '@/components/providers/LobbyStateProvider'
import Button from '@/components/ui/Button'
import { useSearchParams } from 'next/navigation'
import React from 'react'

const PlayPageClient = () => {
  const queryCode = useSearchParams().get('code')
  const lobbyState = useLobbyState().lobbyState
  let parsedCode

  if (queryCode) {
    parsedCode = parseInt(queryCode)
  }

  if (!lobbyState) {
    return <JoinLobbyPage queryCode={ parsedCode } />
  }

  if (!lobbyState.started) {
    return <WaitingInLobbyPage />
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

export default PlayPageClient