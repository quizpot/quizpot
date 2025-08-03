"use client"
import { useLobby } from '@/components/host/LobbyProvider'
import ConnectionStatus from '@/components/play/ConnectionStatus'
import JoinLobbyInput from '@/components/play/JoinLobbyInput'
import React from 'react'

const PlayPage = () => {
  const lobby = useLobby().lobby

  if (!lobby) {
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

export default PlayPage