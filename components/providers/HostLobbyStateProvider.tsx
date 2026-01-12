"use client"
import React, { createContext, useContext, useEffect, useReducer, useRef } from 'react'
import { useWebSocket } from './WebSocketProvider'
import { Answer, LobbySettings } from '@/lib/server/managers/LobbyManager'
import { LobbyStatus } from '@/lib/misc/LobbyStatus'
import { PlayerState } from '@/lib/misc/PlayerState'
import { useRouter } from 'next/navigation'
import { Question, QuizTheme } from '@/lib/QuizFile'

export interface HostLobbyState {
  code: number
  status: LobbyStatus
  players: PlayerState[]
  currentQuestion?: Question
  currentQuestionNumber: number
  totalQuestions: number
  answers: Answer[]
  /** @deprecated fetch the theme from a route instead */
  theme: QuizTheme
  questionTimeout?: number
  lobbySettings: LobbySettings
}

type ReducerAction =
  | { type: 'PLAYER_JOINED', player: PlayerState }
  | { type: 'PLAYER_LEFT', playerId: string }
  | { type: 'PLAYER_UPDATE', player: PlayerState; newId?: string }
  | { type: 'UPDATE_ANSWERS', answers: Answer[] }
  | { type: 'STATUS_UPDATE', data: any }
  | { type: 'SET_STATE', state: HostLobbyState | null }

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
      const updatedPlayers = state!.players.map(p => {
        if (p.id !== action.player.id) return p
        return action.newId ? { ...action.player, id: action.newId } : { ...action.player }
      })
      return { ...state!, players: updatedPlayers.sort((a, b) => b.score - a.score) }
    }

    case 'UPDATE_ANSWERS':
      return { ...state!, answers: action.answers }

    case 'STATUS_UPDATE': {
      const { status, totalQuestions, currentQuestion, timeout } = action.data
      
      if (status === LobbyStatus.question) {
        return {
          ...state!,
          status,
          currentQuestion,
          questionTimeout: timeout,
          totalQuestions: totalQuestions ?? state!.totalQuestions,
          currentQuestionNumber: totalQuestions !== undefined ? 1 : state!.currentQuestionNumber + 1,
        }
      }

      if (status === LobbyStatus.slide) {
        return {
          ...state!,
          status,
          currentQuestion,
          currentQuestionNumber: 0,
          questionTimeout: undefined,
          totalQuestions: totalQuestions ?? 0,
        }
      }

      return { ...state!, status, questionTimeout: timeout }
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
  const { onEvent, isConnected } = useWebSocket()
  const router = useRouter()

  // Ref for "lobbyDeleted" event 
  const stateRef = useRef(state)
  useEffect(() => { stateRef.current = state }, [state])

  useEffect(() => {
    if (!isConnected) return

    const events = [
      onEvent('playerJoined', (ctx) => dispatch({ type: 'PLAYER_JOINED', player: ctx.player })),
      
      onEvent('playerLeft', (ctx) => dispatch({ type: 'PLAYER_LEFT', playerId: ctx.player.id })),
      
      onEvent('playerUpdate', (ctx) => dispatch({ type: 'PLAYER_UPDATE', player: ctx.player, newId: ctx.newId })),
      
      onEvent('updateLobbyAnswers', (ctx) => dispatch({ type: 'UPDATE_ANSWERS', answers: ctx.answers })),
      
      onEvent('lobbyStatusUpdate', (ctx) => dispatch({ type: 'STATUS_UPDATE', data: ctx })),
      
      onEvent('lobbyDeleted', (ctx) => {
        if (stateRef.current?.status === LobbyStatus.end) return;
        sessionStorage.setItem('messageTitle', 'Lobby Deleted');
        sessionStorage.setItem('messageDescription', ctx.reason);
        router.push('/message');
      })
    ]

    return () => events.forEach(unsub => unsub())
  }, [isConnected, onEvent, router])

  const setHostLobbyState = (newState: HostLobbyState | null) => 
    dispatch({ type: 'SET_STATE', state: newState });

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