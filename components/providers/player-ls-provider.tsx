// PlayerLobbyStateProvider.tsx
"use client"

import React, { createContext, useContext, useEffect, useReducer, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { LobbyStatus, PlayerLobbyState } from '@quizpot/quizcore'
import { useWebSocket } from './ws-provider'

type ReducerAction =
  | { type: 'SET_STATE'; state: PlayerLobbyState | null }
  | { type: 'PLAYER_UPDATE'; player: PlayerLobbyState['me'] }
  | { type: 'HOST_STATUS'; connected: boolean }
  | { type: 'STATUS_UPDATE'; payload: any; stepNumber: number }

const lobbyReducer = (state: PlayerLobbyState | null, action: ReducerAction): PlayerLobbyState | null => {
  if (!state && action.type !== 'SET_STATE') return null

  switch (action.type) {
    case 'SET_STATE':
      return action.state

    case 'PLAYER_UPDATE':
      if (action.player.id !== state!.me.id) return state
      return { ...state!, me: action.player }

    case 'HOST_STATUS':
      return { ...state!, hostConnected: action.connected }

    case 'STATUS_UPDATE': {
      const { payload, stepNumber } = action
      const base = { ...state!, stepNumber }

      if (payload.status === LobbyStatus.question) {
        return {
          ...base,
          status: payload.status,
          currentQuestion: payload.question,
          timeout: new Date(payload.timeoutStartedAt).toISOString(),
        }
      }

      if (payload.status === LobbyStatus.slide) {
        return {
          ...base,
          status: payload.status,
          currentQuestion: undefined,
          timeout: undefined,
        }
      }

      // answer, answers, score, end — clear question and timeout
      return {
        ...base,
        status: payload.status,
        currentQuestion: undefined,
        timeout: undefined,
      }
    }

    default:
      return state
  }
}

const PlayerLobbyContext = createContext<{
  playerLobbyState: PlayerLobbyState | null
  setPlayerLobbyState: (state: PlayerLobbyState | null) => void
} | null>(null)

export const PlayerLobbyStateProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(lobbyReducer, null)
  const { onEvent } = useWebSocket()
  const router = useRouter()

  const stateRef = useRef(state)
  useEffect(() => { stateRef.current = state }, [state])

  useEffect(() => {
    const unsubs = [
      onEvent('LOBBY_JOINED', (ctx) => {
        if (ctx.payload.role !== 'player') return
        dispatch({ type: 'SET_STATE', state: ctx.payload.state })
      }),

      onEvent('PLAYER_UPDATE', (ctx) => {
        dispatch({ type: 'PLAYER_UPDATE', player: ctx.payload.player })
      }),

      onEvent('HOST_STATUS', (ctx) => {
        dispatch({ type: 'HOST_STATUS', connected: ctx.payload.connected })
      }),

      onEvent('LOBBY_STATUS_UPDATE', (ctx) => {
        dispatch({ type: 'STATUS_UPDATE', payload: ctx.payload, stepNumber: ctx.stepNumber })
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

  const setPlayerLobbyState = (newState: PlayerLobbyState | null) =>
    dispatch({ type: 'SET_STATE', state: newState })

  return (
    <PlayerLobbyContext.Provider value={{ playerLobbyState: state, setPlayerLobbyState }}>
      {children}
    </PlayerLobbyContext.Provider>
  )
}

export const usePlayerLobbyState = () => {
  const context = useContext(PlayerLobbyContext)
  if (!context) throw new Error("usePlayerLobbyState must be used within PlayerLobbyStateProvider")
  return context
}