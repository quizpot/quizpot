"use client"

import React, { createContext, useContext, useEffect, useReducer, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { HostLobbyState, LobbyStatus } from '@quizpot/quizcore'
import { useWebSocket } from './ws-provider'

type ReducerAction =
  | { type: 'SET_STATE'; state: HostLobbyState | null }
  | { type: 'PLAYER_JOINED'; player: HostLobbyState['players'][number] }
  | { type: 'PLAYER_LEFT'; playerId: string }
  | { type: 'PLAYER_UPDATE'; player: HostLobbyState['players'][number] }
  | { type: 'UPDATE_ANSWER_COUNT'; count: number }
  | { type: 'STATUS_UPDATE'; payload: any; stepNumber: number }

const lobbyReducer = (state: HostLobbyState | null, action: ReducerAction): HostLobbyState | null => {
  if (!state && action.type !== 'SET_STATE') return null

  switch (action.type) {
    case 'SET_STATE':
      return action.state

    case 'PLAYER_JOINED':
      return { ...state!, players: [...state!.players, action.player] }

    case 'PLAYER_LEFT':
      return { ...state!, players: state!.players.filter(p => p.id !== action.playerId) }

    case 'PLAYER_UPDATE': {
      const players = state!.players.map(p => p.id === action.player.id ? action.player : p)
      return { ...state!, players: players.sort((a, b) => b.score - a.score) }
    }

    case 'UPDATE_ANSWER_COUNT':
      return state

    case 'STATUS_UPDATE': {
      const { payload, stepNumber } = action
      const base = { ...state!, stepNumber }

      if (payload.status === LobbyStatus.question) {
        return {
          ...base,
          status: payload.status,
          currentQuestion: payload.question,
          timeout: new Date(payload.timeoutStartedAt).toISOString(),
          answers: [],
        }
      }

      if (payload.status === LobbyStatus.slide) {
        return {
          ...base,
          status: payload.status,
          currentQuestion: undefined,
          timeout: undefined,
          answers: [],
        }
      }

      if (payload.status === LobbyStatus.answers) {
        return {
          ...base,
          status: payload.status,
          answers: payload.answers ?? state!.answers,
        }
      }

      if (payload.status === LobbyStatus.score) {
        return {
          ...base,
          status: payload.status,
          players: payload.leaderboard,
        }
      }

      return { ...base, status: payload.status }
    }

    default:
      return state
  }
}

const HostLobbyContext = createContext<{
  hostLobbyState: HostLobbyState | null
  setHostLobbyState: (state: HostLobbyState | null) => void
} | null>(null)

export const HostLobbyStateProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(lobbyReducer, null)
  const { onEvent } = useWebSocket()
  const router = useRouter()

  const stateRef = useRef(state)
  useEffect(() => { stateRef.current = state }, [state])

  useEffect(() => {
    const unsubs = [
      onEvent('LOBBY_JOINED', (ctx) => {
        if (ctx.payload.role !== 'host') return
        dispatch({ type: 'SET_STATE', state: ctx.payload.state })
      }),

      onEvent('PLAYER_JOINED', (ctx) => {
        dispatch({ type: 'PLAYER_JOINED', player: ctx.payload.player })
      }),

      onEvent('PLAYER_LEFT', (ctx) => {
        dispatch({ type: 'PLAYER_LEFT', playerId: ctx.payload.playerId })
      }),

      onEvent('PLAYER_UPDATE', (ctx) => {
        dispatch({ type: 'PLAYER_UPDATE', player: ctx.payload.player })
      }),

      onEvent('UPDATE_LOBBY_ANSWERS', (ctx) => {
        dispatch({ type: 'UPDATE_ANSWER_COUNT', count: ctx.payload.count })
      }),

      onEvent('LOBBY_STATUS_UPDATE', (ctx) => {
        dispatch({ type: 'STATUS_UPDATE', payload: ctx.payload, stepNumber: ctx.stepNumber })
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

  const setHostLobbyState = (newState: HostLobbyState | null) =>
    dispatch({ type: 'SET_STATE', state: newState })

  return (
    <HostLobbyContext.Provider value={{ hostLobbyState: state, setHostLobbyState }}>
      {children}
    </HostLobbyContext.Provider>
  )
}

export const useHostLobbyState = () => {
  const context = useContext(HostLobbyContext)
  if (!context) throw new Error("useHostLobbyState must be used within HostLobbyStateProvider")
  return context
}