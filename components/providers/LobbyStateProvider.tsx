"use client"
import React, { createContext, useEffect } from 'react'
import { useWebSocket } from '../ws/WebSocket'

interface PlayerState {
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
  const { onEvent, isConnected } = useWebSocket()

  useEffect(() => {
    console.log("[LobbyStateProvider] useEffect")
    if (!isConnected || !lobbyState) return
    console.log("[LobbyStateProvider] connected")
    
    const unsubscribePlayerJoined = onEvent('playerJoined', (ctx) => {
      console.log("[LobbyStateProvider] Handling player joined event")
      setLobbyState(prevLobbyState => {
        if (!prevLobbyState) return null

        return {
          ...prevLobbyState,
          players: [...prevLobbyState.players, ctx.player]
        }
      })
    })

    const unsubscribePlayerLeft = onEvent('playerLeft', (ctx) => {
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