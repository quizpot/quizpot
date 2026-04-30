"use client"
import React, { createContext, useContext, useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { LobbyStatus, PlayerLobbyState } from '@quizpot/quizcore'
import { useWebSocket } from './ws-provider'
import MessagePage from '../ui/message-page'

interface PlayerLobbyContextValue {
  playerLobbyState: PlayerLobbyState | null
  setPlayerLobbyState: React.Dispatch<React.SetStateAction<PlayerLobbyState | null>>
}

const PlayerLobbyContext = createContext<PlayerLobbyContextValue | null>(null)

export const PlayerLobbyStateProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<PlayerLobbyState | null>(null)
  const { onEvent } = useWebSocket()
  const router = useRouter()

  const [message, setMessage] = useState<string | null>(null)

  const stateRef = useRef(state)
  useEffect(() => {
    stateRef.current = state
  }, [state])

  useEffect(() => {
    const unsubs = [
      onEvent('LOBBY_JOINED', (ctx) => {
        if (ctx.payload.role !== 'player') return
        setState(ctx.payload.state)
      }),

      onEvent('PLAYER_UPDATE', (ctx) => {
        setState(prev => {
          if (!prev || ctx.payload.player.id !== prev.me.id) return prev
          return { ...prev, me: ctx.payload.player }
        })
      }),

      onEvent('HOST_STATUS', (ctx) => {
        setState(prev => prev ? { ...prev, hostConnected: ctx.payload.connected } : null)
      }),

      // Called when the host's answer is correct/incorrect — updates hasAnswered,
      // wasCorrect, and syncs the player's own score/streak from the server.
      onEvent('PLAYER_ANSWER_RESULT', (ctx) => {
        setState(prev => {
          if (!prev) return null
          return {
            ...prev,
            me: ctx.payload.player,
            hasAnswered: true,
            wasCorrect: ctx.payload.isCorrect,
          }
        })
      }),

      onEvent('LOBBY_STATUS_UPDATE', (ctx) => {
        setState(prev => {
          if (!prev) return null
          const base: PlayerLobbyState = { ...prev, stepNumber: ctx.stepNumber }

          switch (ctx.payload.status) {
            case LobbyStatus.question:
              return {
                ...base,
                status: ctx.payload.status,
                currentStep: { type: 'question', data: ctx.payload.question },
                timeout: new Date(ctx.payload.timeoutStartedAt).toISOString(),
                hasAnswered: false,
                wasCorrect: false,
              }

            case LobbyStatus.slide:
              return {
                ...base,
                status: ctx.payload.status,
                currentStep: { type: 'slide', data: ctx.payload.slide },
                timeout: undefined,
                hasAnswered: false,
                wasCorrect: false,
              }

            case LobbyStatus.answer:
              // Players are now in the answering window — show the countdown.
              return {
                ...base,
                status: ctx.payload.status,
                timeout: new Date(ctx.payload.timeoutStartedAt).toISOString(),
              }

            case LobbyStatus.answers:
              // Review phase. Players don't receive the answers array,
              // their individual result comes via PLAYER_ANSWER_RESULT.
              return {
                ...base,
                status: ctx.payload.status,
                timeout: undefined,
              }

            case LobbyStatus.score:
              // Leaderboard phase. Update the player's own score from the
              // leaderboard so their displayed score is always accurate.
              return {
                ...base,
                status: ctx.payload.status,
                me: ctx.payload.leaderboard.find(p => p.id === prev.me.id) ?? prev.me,
                timeout: undefined,
              }

            case LobbyStatus.end:
              return {
                ...base,
                status: ctx.payload.status,
                timeout: undefined,
              }

            case LobbyStatus.waiting:
              return {
                ...base,
                status: ctx.payload.status,
                timeout: undefined,
              }

            default:
              return base
          }
        })
      }),

      onEvent('PLAYER_KICKED', () => {
        setMessage('You were kicked')
      }),

      onEvent('LOBBY_DELETED', (ctx) => {
        if (stateRef.current?.status === LobbyStatus.end) return
        setMessage(ctx.payload.reason)
      }),
    ]

    return () => unsubs.forEach(unsub => unsub())
  }, [onEvent, router])

  if (message) return <MessagePage message={message} />

  return (
    <PlayerLobbyContext.Provider value={{ playerLobbyState: state, setPlayerLobbyState: setState }}>
      {children}
    </PlayerLobbyContext.Provider>
  )
}

export const usePlayerLobbyState = () => {
  const context = useContext(PlayerLobbyContext)
  if (!context) {
    throw new Error("usePlayerLobbyState must be used within PlayerLobbyStateProvider")
  }
  return context
}