"use client"

import React, { createContext, useContext, useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { LobbyStatus, PlayerLobbyState } from '@quizpot/quizcore'
import { useWebSocket } from './ws-provider'

interface PlayerLobbyContextValue {
  playerLobbyState: PlayerLobbyState | null
  setPlayerLobbyState: React.Dispatch<React.SetStateAction<PlayerLobbyState | null>>
}

const PlayerLobbyContext = createContext<PlayerLobbyContextValue | null>(null)

export const PlayerLobbyStateProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<PlayerLobbyState | null>(null)
  const { onEvent } = useWebSocket()
  const router = useRouter()

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

      onEvent('LOBBY_STATUS_UPDATE', (ctx) => {
        setState(prev => {
          if (!prev) return null
          const base: PlayerLobbyState = { ...prev, stepNumber: ctx.stepNumber }

          if (ctx.payload.status === LobbyStatus.question) {
            return {
              ...base,
              status: ctx.payload.status,
              currentQuestion: ctx.payload.question,
              timeout: ctx.payload.timeoutStartedAt 
                ? new Date(ctx.payload.timeoutStartedAt).toISOString() 
                : undefined,
              hasAnswered: false // Reset answer state for new questions
            }
          }

          return {
            ...base,
            status: ctx.payload.status,
            currentQuestion: undefined,
            timeout: undefined,
          }
        })
      }),

      onEvent('PLAYER_KICKED', () => {
        sessionStorage.setItem('messageTitle', 'You were kicked')
        sessionStorage.setItem('messageDescription', 'The host removed you from the lobby.')
        router.push('/message')
      }),

      onEvent('LOBBY_DELETED', (ctx) => {
        if (stateRef.current?.status === LobbyStatus.end) return
        sessionStorage.setItem('messageTitle', 'Lobby Deleted')
        sessionStorage.setItem('messageDescription', ctx.payload.reason)
        router.push('/message')
      }),
    ]

    return () => unsubs.forEach(unsub => unsub())
  }, [onEvent, router])

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