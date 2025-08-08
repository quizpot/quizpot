"use client"
import LobbyWaitingPage from '@/components/host/LobbyWaitingPage'
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

  return (
    <>
      Lobby started
    </>
  )
}

export default HostPage