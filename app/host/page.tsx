"use client"
import LobbyWaitingPage from '@/components/host/LobbyWaitingPage'
import QuestionPage from '@/components/host/QuestionPage'
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

export default HostPage