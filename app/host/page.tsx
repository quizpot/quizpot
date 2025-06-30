"use client"
import { useLobby } from '@/components/host/LobbyProvider'
import UploadQuizPrompt from '@/components/host/UploadQuizPrompt'
import ConnectionStatus from '@/components/quiz/ConnectionStatus'
import React from 'react'

const HostPage = () => {
  // Send quiz to websocket, load the quiz and create a lobby
  const lobbyCode = useLobby().code

  if (!lobbyCode) {
    return (
      <>
        <ConnectionStatus />
        <UploadQuizPrompt />
      </>
    )
  }
  
  // Show the lobby with all the info and stuff
  return (
    <>
      { lobbyCode }
    </>
  )
}

export default HostPage