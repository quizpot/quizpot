"use client"
import JoinLobbyPage from '@/components/play/JoinLobbyPage'
import QuestionPage from '@/components/play/QuestionPage'
import WaitingInLobbyPage from '@/components/play/WaitingInLobbyPage'
import { useLobbyState } from '@/components/providers/LobbyStateProvider'
import { useSearchParams } from 'next/navigation'
import React from 'react'

const PlayPage = () => {
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
    return <></>
  }

  if (lobbyState.state === 'question') {
    return <QuestionPage lobbyState={ lobbyState } />
  }

  if (lobbyState.state === 'answer') {
    return (
      <p>Answer Page</p>
    )
  }

  if (lobbyState.state === 'score') {
    return (
      <p>Score Page</p>
    )
  }

  if (lobbyState.state === 'end') {
    return (
      <p>End Page</p>
    )
  }

  return (
    <>
      Lobby Done
    </>
  )
}

export default PlayPage