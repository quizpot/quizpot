"use client"
import AnswerPage from '@/components/player/pages/AnswerPage'
import QuestionPage from '@/components/player/pages/QuestionPage'
import SetNamePage from '@/components/player/pages/SetNamePage'
import WaitingInLobbyPage from '@/components/player/pages/WaitingInLobbyPage'
import { usePlayerLobbyState } from '@/components/providers/PlayerLobbyStateProvider'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import ScorePage from '@/components/player/pages/ScorePage'
import EndPage from '@/components/player/pages/EndPage'
import Button from '@/components/ui/Button'
import AnswersPage from '@/components/player/pages/AnswersPage'
import SetCodePage from '@/components/player/pages/SetCodePage'
import AnsweredPage from '@/components/player/pages/AnsweredPage'

const PlayPage = () => {
  const queryCode = useSearchParams().get('code')
  const playerLobbyState = usePlayerLobbyState().playerLobbyState
  let parsedCode

  if (queryCode) {
    parsedCode = parseInt(queryCode)
  }

  if (!queryCode || !parsedCode || isNaN(parsedCode)) {
    return <SetCodePage />
  }

  if (!playerLobbyState) {
    return <SetNamePage queryCode={ parsedCode } />
  }

  if (playerLobbyState.status === 'waiting') {
    return <WaitingInLobbyPage playerLobbyState={ playerLobbyState } />
  }

  if (playerLobbyState.status === 'question') {
    return <QuestionPage playerLobbyState={ playerLobbyState } />
  }

  if (playerLobbyState.hasAnswered) {
    return <AnsweredPage playerLobbyState={ playerLobbyState } />
  }

  if (playerLobbyState.status === 'answer') {
    return <AnswerPage playerLobbyState={ playerLobbyState } />
  }

  if (playerLobbyState.status === 'answers') {
    return <AnswersPage playerLobbyState={ playerLobbyState } />
  }

  if (playerLobbyState.status === 'score') {
    return <ScorePage playerLobbyState={ playerLobbyState } />
  }

  if (playerLobbyState.status === 'end') {
    return <EndPage playerLobbyState={ playerLobbyState } />
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

export default PlayPage