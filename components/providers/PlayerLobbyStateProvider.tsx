"use client"
import React, { createContext, useEffect, useRef } from 'react'
import { useWebSocket } from './WebSocketProvider'
import { redirect } from 'next/navigation'
import { LobbyStatus } from '@/lib/misc/LobbyStatus'
import { PlayerState } from '@/lib/misc/PlayerState'
import { SanitizedQuestion } from '@/lib/misc/QuestionSanitizer'
import { QuizTheme } from '@/lib/misc/QuizFile'

export interface PlayerLobbyState {
  code: number
  status: LobbyStatus
  player: PlayerState
  currentQuestion?: SanitizedQuestion
  currentQuestionNumber: number
  totalQuestions: number
  correctAnswer: boolean
  hasAnswered: boolean
  theme: QuizTheme
}

const PlayerLobbyStateContext = createContext<{
  playerLobbyState: PlayerLobbyState | null
  setPlayerLobbyState: React.Dispatch<React.SetStateAction<PlayerLobbyState | null>>
} | null>(null)

export const PlayerLobbyStateProvider = ({ children }: { children: React.ReactNode }) => {
  const [playerLobbyState, setPlayerLobbyState] = React.useState<PlayerLobbyState | null>(null)
  const playerLobbyStateRef = useRef<PlayerLobbyState | null>(null)
  const { onEvent, isConnected } = useWebSocket()

  useEffect(() => {
    playerLobbyStateRef.current = playerLobbyState
  }, [playerLobbyState])

  useEffect(() => {
    if (!isConnected) return

    const unsubscribePlayerKicked = onEvent('playerKicked', () => {
      sessionStorage.setItem('messageTitle', 'You were kicked')
      sessionStorage.setItem('messageDescription', 'The host kicked you.')
      redirect('/message')
    })

    const unsubscribePlayerScoreUpdate = onEvent('playerUpdate', (ctx) => {
      setPlayerLobbyState(prevPlayerLobbyState => {
        if (!prevPlayerLobbyState) return null

        return {
          ...prevPlayerLobbyState,
          player: ctx.player
        }
      })
    })

    const unsubscribeCorrectAnswerUpdate = onEvent('correctAnswerUpdate', (ctx) => {
      setPlayerLobbyState(prevPlayerLobbyState => {
        if (!prevPlayerLobbyState) return null

        return {
          ...prevPlayerLobbyState,
          correctAnswer: ctx.correctAnswer
        }
      })
    })

    const unsubscribeLobbyStatusUpdate = onEvent('lobbyStatusUpdate', (ctx) => {
      setPlayerLobbyState(prevPlayerLobbyState => {
        if (!prevPlayerLobbyState) return null

        if (ctx.status === LobbyStatus.question) {
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
          hasAnswered: false,
        }
      })
    })

    const unsubscribeLobbyDeleted = onEvent('lobbyDeleted', (ctx) => {
      if (LobbyStatus.end === playerLobbyStateRef.current?.status) return

      sessionStorage.setItem('messageTitle', 'Lobby Deleted')
      sessionStorage.setItem('messageDescription', ctx.reason)
      redirect('/message')
    })

    return () => {
      unsubscribePlayerScoreUpdate()
      unsubscribeLobbyDeleted()
      unsubscribeLobbyStatusUpdate()
      unsubscribePlayerKicked()
      unsubscribeCorrectAnswerUpdate()
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