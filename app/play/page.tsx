"use client"
import AnswerPage from '@/components/play/AnswerPage'
import QuestionPage from '@/components/play/QuestionPage'
import JoinLobbyPage from '@/components/play/JoinLobbyPage'
import SetNamePage from '@/components/play/SetNamePage'
import WaitingInLobbyPage from '@/components/play/WaitingInLobbyPage'
import { usePlayerLobbyState } from '@/components/providers/PlayerLobbyStateProvider'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import ScorePage from '@/components/play/ScorePage'
import EndPage from '@/components/play/EndPage'
import Button from '@/components/ui/Button'

const PlayPage = () => {
  const queryCode = useSearchParams().get('code')
  const playerLobbyState = usePlayerLobbyState().playerLobbyState
  const [name, setName] = useState<string | null>(null)
  let parsedCode

  useEffect(() => {
    setName(sessionStorage.getItem('name'))
  }, [])

  if (queryCode) {
    parsedCode = parseInt(queryCode)
  }

  if (!name) {
    return <SetNamePage queryCode={ parsedCode } />
  }

  if (!playerLobbyState) {
    return <JoinLobbyPage queryCode={ parsedCode } />
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