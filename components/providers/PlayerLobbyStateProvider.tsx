"use client"
import React, { createContext, useEffect } from 'react'
import { useWebSocket } from './WebSocketProvider'
import { redirect } from 'next/navigation'
import { LobbyStatus } from '@/lib/misc/LobbyStatus'
import { PlayerState } from '@/lib/misc/PlayerState'
import { SanitizedQuestion } from '@/lib/misc/QuestionSanitizer'

export interface PlayerLobbyState {
  code: number
  status: LobbyStatus
  player: PlayerState
  currentQuestion: SanitizedQuestion
  currentQuestionNumber: number
  totalQuestions: number
}

const PlayerLobbyStateContext = createContext<{
  playerLobbyState: PlayerLobbyState | null
  setPlayerLobbyState: (playerLobbyState: PlayerLobbyState | null) => void
} | null>(null)

export const PlayerLobbyStateProvider = ({ children }: { children: React.ReactNode }) => {
  const [playerLobbyState, setPlayerLobbyState] = React.useState<PlayerLobbyState | null>(null)
  const { onEvent, isConnected } = useWebSocket()

  useEffect(() => {
    if (!isConnected) return

    const unsubscribePlayerKicked = onEvent('playerKicked', () => {
      sessionStorage.setItem('messageTitle', 'You were kicked')
      sessionStorage.setItem('messageDescription', 'The host kicked you.')
      redirect('/message')
    })

    const unsubscribePlayerScoreUpdate = onEvent('playerScoreUpdate', (ctx) => {
      setPlayerLobbyState(prevPlayerLobbyState => {
        if (!prevPlayerLobbyState) return null

        return {
          ...prevPlayerLobbyState,
          player: {
            ...prevPlayerLobbyState.player,
            score: ctx.score
          }
        }
      })
    })

    const unsubscribeLobbyStatusUpdate = onEvent('lobbyStatusUpdate', (ctx) => {
      setPlayerLobbyState(prevPlayerLobbyState => {
        if (!prevPlayerLobbyState) return null

        if (ctx.state === 'question') {
          return {
            ...prevPlayerLobbyState,
            status: ctx.status,
            currentQuestion: ctx.sanitizedQuestion,
            currentQuestionNumber: prevPlayerLobbyState.currentQuestionNumber + 1,
          }
        }

        return {
          ...prevPlayerLobbyState,
          status: ctx.status,
        }
      })
    })

    const unsubscribeLobbyDeleted = onEvent('lobbyDeleted', () => {
      sessionStorage.setItem('messageTitle', 'Lobby Deleted')
      sessionStorage.setItem('messageDescription', 'The host disconnected.')
      redirect('/message')
    })

    return () => {
      unsubscribePlayerScoreUpdate()
      unsubscribeLobbyDeleted()
      unsubscribeLobbyStatusUpdate()
      unsubscribePlayerKicked()
    }
  }, [isConnected, onEvent])

  return (
    <PlayerLobbyStateContext.Provider value={{ playerLobbyState, setPlayerLobbyState }}>
      { children }
    </PlayerLobbyStateContext.Provider>
  )
}

export const usePlayerLobbyState = () => {
  const context = React.useContext(PlayerLobbyStateContext)
  
  if (context === null) {
    throw new Error("usePlayerLobbyState must be used within a PlayerLobbyStateProvider")
  }

  return context
}