"use client"
import ConnectionStatus from '@/components/play/ConnectionStatus'
import JoinLobbyInput from '@/components/play/JoinLobbyInput'
import { useLobbyState } from '@/components/providers/LobbyStateProvider'
import React from 'react'

const PlayPage = () => {
  const lobbyState = useLobbyState().lobbyState

  if (!lobbyState) {
    return (
      <>
        <ConnectionStatus />
        <JoinLobbyInput />
      </>
    )
  }

  return (
    <>
      Current lobby: { lobbyState.code }
      { lobbyState.player?.name }
      <ConnectionStatus />
    </>
  )
}

export default PlayPage