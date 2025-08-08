"use client"
import React, { createContext, useEffect } from 'react'
import { useWebSocket } from '../ws/WebSocket'
import { redirect } from 'next/navigation'

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

interface LobbyState {
  code: number
  players: PlayerState[]
  started: boolean
  currentQuestionIndex: number
  totalQuestions: number
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
        redirect('/kicked')
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

    const unsubscribeCurrentQuestionIndexUpdate = onEvent('currentQuestionIndexUpdate', (ctx) => {
      setLobbyState(prevLobbyState => {
        if (!prevLobbyState) return null

        return {
          ...prevLobbyState,
          currentQuestionIndex: ctx.currentQuestionIndex
        }
      })
    })

    return () => {
      unsubscribePlayerJoined()
      unsubscribePlayerLeft()
      unsubscribePlayerScoreUpdate()
      unsubscribeLobbyStarted()
      unsubscribeCurrentQuestionIndexUpdate()
    }
  }, [isConnected, lobbyState, onEvent, setLobbyState])

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