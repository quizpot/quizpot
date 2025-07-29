"use client"
import { useLobby } from '@/components/host/LobbyProvider'
import ConnectionStatus from '@/components/quiz/ConnectionStatus'
import JoinLobbyInput from '@/components/quiz/JoinLobbyInput'
import React from 'react'

const QuizPage = () => {
  const lobby = useLobby()

  if (!lobby.code) {
    return (
      <>
        <ConnectionStatus />
        <JoinLobbyInput />
      </>
    )
  }

  return (
    <>
      Current lobby: { lobby.code }
      <ConnectionStatus />
    </>
  )
}

export default QuizPage