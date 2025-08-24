"use client"
import AnswerPage from '@/components/player/AnswerPage'
import QuestionPage from '@/components/player/QuestionPage'
import SetNamePage from '@/components/player/SetNamePage'
import WaitingInLobbyPage from '@/components/player/WaitingInLobbyPage'
import { usePlayerLobbyState } from '@/components/providers/PlayerLobbyStateProvider'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import ScorePage from '@/components/player/ScorePage'
import EndPage from '@/components/player/EndPage'
import Button from '@/components/ui/Button'
import AnswersPage from '@/components/player/AnswersPage'
import SetCodePage from '@/components/player/SetCodePage'

const PlayPage = () => {
  const queryCode = useSearchParams().get('code')
  const playerLobbyState = usePlayerLobbyState().playerLobbyState
  let parsedCode

  if (queryCode) {
    parsedCode = parseInt(queryCode)
  }

  if (!queryCode) {
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