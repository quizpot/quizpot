"use client"
import React, { createContext, useEffect } from 'react'
import { useWebSocket } from '../ws/WebSocket'
import { redirect } from 'next/navigation'
import { Question } from '@/lib/QuizFile'

/**
 * Player state interface
 * @property id - The player's websocket ID only on host
 * @property name - The player's name
 * @property score - The player's current score
 */
interface PlayerState {
  id?: string
  name: string
  score: number
}

export interface LobbyState {
  code: number
  players: PlayerState[]
  player: PlayerState
  started: boolean
  currentQuestionIndex: number
  currentQuestion?: Question
  answerCount: number
  totalQuestions: number
  state: 'waiting' | 'question' | 'answer' | 'score' | 'end'
}

const LobbyStateContext = createContext<{
  lobbyState: LobbyState | null
  setLobbyState: (lobbyState: LobbyState | null) => void
} | null>(null)

export const LobbyStateProvider = ({ children }: { children: React.ReactNode }) => {
  const [lobbyState, setLobbyState] = React.useState<LobbyState | null>(null)
  const { onEvent, isConnected, clientId } = useWebSocket()

  useEffect(() => {
    if (!isConnected || !lobbyState) return
    
    const unsubscribePlayerJoined = onEvent('playerJoined', (ctx) => {
      setLobbyState(prevLobbyState => {
        if (!prevLobbyState) return null

        return {
          ...prevLobbyState,
          players: [...prevLobbyState.players, ctx.player]
        }
      })
    })

    const unsubscribePlayerLeft = onEvent('playerLeft', (ctx) => {
      if (ctx.player.id === clientId) {
        sessionStorage.setItem('messageTitle', 'You were kicked')
        sessionStorage.setItem('messageDescription', 'The host kicked you.')
        redirect('/message')
      }

      setLobbyState(prevLobbyState => {
        if (!prevLobbyState) return null

        return {
          ...prevLobbyState,
          players: prevLobbyState.players.filter(player => player.name !== ctx.player.name)
        }
      })
    })

    const unsubscribePlayerScoreUpdate = onEvent('playerScoreUpdate', (ctx) => {
      setLobbyState(prevLobbyState => {
        if (!prevLobbyState) return null

        return {
          ...prevLobbyState,
          players: prevLobbyState.players.map(player => 
            player.name === ctx.player.name ? { ...player, score: ctx.player.score } : player
          )
        }
      })
    })

    const unsubscribeLobbyStarted = onEvent('lobbyStarted', () => {
      setLobbyState(prevLobbyState => {
        if (!prevLobbyState) return null

        return {
          ...prevLobbyState,
          started: true
        }
      })
    })

    const unsubscribeLobbyStateUpdate = onEvent('lobbyStateUpdate', (ctx) => {
      setLobbyState(prevLobbyState => {
        if (!prevLobbyState) return null

        if (ctx.state === 'question') {
          return {
            ...prevLobbyState,
            state: ctx.state,
            currentQuestion: ctx.question,
          }
        }

        return {
          ...prevLobbyState,
          state: ctx.state,
        }
      })
    })

    const unsubscribeCurrentQuestionIndexUpdate = onEvent('currentQuestionIndexUpdate', (ctx) => {
      setLobbyState(prevLobbyState => {
        if (!prevLobbyState) return null

        return {
          ...prevLobbyState,
          currentQuestionIndex: ctx.currentQuestionIndex
        }
      })
    })

    const unsubscribeLobbyDeleted = onEvent('lobbyDeleted', () => {
      sessionStorage.setItem('messageTitle', 'Lobby Deleted')
      sessionStorage.setItem('messageDescription', 'The host disconnected.')
      redirect('/message')
    })

    const unsubscribeSyncPlayer = onEvent('syncPlayer', (ctx) => {
      setLobbyState(prevLobbyState => {
        if (!prevLobbyState) return null
        console.log('synced player with name:', ctx.player.name)

        return {
          ...prevLobbyState,
          player: ctx.player
        }
      })
    })

    return () => {
      unsubscribePlayerJoined()
      unsubscribePlayerLeft()
      unsubscribePlayerScoreUpdate()
      unsubscribeLobbyStarted()
      unsubscribeCurrentQuestionIndexUpdate()
      unsubscribeLobbyDeleted()
      unsubscribeSyncPlayer()
      unsubscribeLobbyStateUpdate()
    }
  }, [clientId, isConnected, lobbyState, onEvent, setLobbyState])

  return (
    <LobbyStateContext.Provider value={{ lobbyState, setLobbyState }}>
      { children }
    </LobbyStateContext.Provider>
  )
}

export const useLobbyState = () => {
  const context = React.useContext(LobbyStateContext)
  
  if (context === null) {
    throw new Error("useLobbyState must be used within a LobbyStateProvider")
  }

  return context
}