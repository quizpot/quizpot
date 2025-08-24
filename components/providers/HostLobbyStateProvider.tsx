"use client"
import React, { createContext, useEffect } from 'react'
import { useWebSocket } from './WebSocketProvider'
import { Answer } from '@/lib/server/managers/LobbyManager'
import { LobbyStatus } from '@/lib/misc/LobbyStatus'
import { PlayerState } from '@/lib/misc/PlayerState'
import { SanitizedQuestion } from '@/lib/misc/QuestionSanitizer'

export interface HostLobbyState {
  code: number
  status: LobbyStatus
  players: PlayerState[]
  currentQuestion?: SanitizedQuestion
  currentQuestionNumber: number
  totalQuestions: number
  answers: Answer[]
}

const HostLobbyStateContext = createContext<{
  hostLobbyState: HostLobbyState | null
  setHostLobbyState: (hostLobbyState: HostLobbyState | null) => void
} | null>(null)

export const HostLobbyStateProvider = ({ children }: { children: React.ReactNode }) => {
  const [hostLobbyState, setHostLobbyState] = React.useState<HostLobbyState | null>(null)
  const { onEvent, isConnected } = useWebSocket()

  useEffect(() => {
    if (!isConnected) return
    
    const unsubscribePlayerJoined = onEvent('playerJoined', (ctx) => {
      setHostLobbyState(prevHostLobbyState => {
        if (!prevHostLobbyState || prevHostLobbyState.status !== 'waiting') return prevHostLobbyState

        return {
          ...prevHostLobbyState,
          players: [...prevHostLobbyState.players, ctx.player]
        }
      })
    })

    const unsubscribePlayerLeft = onEvent('playerLeft', (ctx) => {
      setHostLobbyState(prevHostLobbyState => {
        if (!prevHostLobbyState) return null

        return {
          ...prevHostLobbyState,
          players: prevHostLobbyState.players.filter(player => player.id !== ctx.player.id)
        }
      })
    })

    const unsubscribePlayerScoreUpdate = onEvent('playerUpdate', (ctx) => {
      setHostLobbyState(prevHostLobbyState => {
        if (!prevHostLobbyState) return null

        return {
          ...prevHostLobbyState,
          players: prevHostLobbyState.players.map(player => 
            player.id === ctx.player.id ? { ...ctx.player } : player
          )
        }
      })
    })

    const unsubscribeLobbyStatusUpdate = onEvent('lobbyStatusUpdate', (ctx) => {
      setHostLobbyState(prevHostLobbyState => {
        if (!prevHostLobbyState) return null

        if (ctx.status === LobbyStatus.question) {
          return {
            ...prevHostLobbyState,
            status: ctx.status,
            currentQuestion: ctx.sanitizedQuestion,
            currentQuestionNumber: prevHostLobbyState.currentQuestionNumber + 1,
          }
        }

        return {
          ...prevHostLobbyState,
          status: ctx.status,
        }
      })
    })

    const unsubscribeUpdateLobbyAnswers = onEvent('updateLobbyAnswers', (ctx) => {
      setHostLobbyState(prevHostLobbyState => {
        if (!prevHostLobbyState) return null

        return {
          ...prevHostLobbyState,
          answers: ctx.answers
        }
      })
    })

    return () => {
      unsubscribePlayerJoined()
      unsubscribePlayerLeft()
      unsubscribePlayerScoreUpdate()
      unsubscribeUpdateLobbyAnswers()
      unsubscribeLobbyStatusUpdate()
    }
  }, [isConnected, onEvent])

  return (
    <HostLobbyStateContext.Provider value={{ hostLobbyState, setHostLobbyState }}>
      { children }
    </HostLobbyStateContext.Provider>
  )
}

export const useHostLobbyState = () => {
  const context = React.useContext(HostLobbyStateContext)
  
  if (context === null) {
    throw new Error("useHostLobbyState must be used within a HostLobbyStateProvider")
  }

  return context
}