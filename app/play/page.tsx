"use client"
import JoinLobbyPage from '@/components/play/JoinLobbyPage'
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

  return (
    <>
      Lobby Started
    </>
  )
}

export default PlayPage