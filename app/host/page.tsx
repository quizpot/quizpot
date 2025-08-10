"use client"
import AnswerPage from '@/components/host/AnswerPage'
import EndPage from '@/components/host/EndPage'
import LobbyWaitingPage from '@/components/host/LobbyWaitingPage'
import QuestionPage from '@/components/host/QuestionPage'
import ScorePage from '@/components/host/ScorePage'
import UploadQuizPage from '@/components/host/UploadQuizPage'
import { useLobbyState } from '@/components/providers/LobbyStateProvider'
import React from 'react'

const HostPage = () => {
  const lobbyState = useLobbyState().lobbyState

  if (!lobbyState) {
    return (
      <UploadQuizPage />
    )
  }
  
  if (!lobbyState.started) {
    return (
      <LobbyWaitingPage />
    )
  }

  if (lobbyState.state === 'waiting') {
    // Might be pointless
    return <></>
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
    <>
      Unknown Lobby State
    </>
  )
}

export default HostPage