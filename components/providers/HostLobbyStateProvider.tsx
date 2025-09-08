"use client"
import React, { createContext, useEffect, useRef } from 'react'
import { useWebSocket } from './WebSocketProvider'
import { Answer } from '@/lib/server/managers/LobbyManager'
import { LobbyStatus } from '@/lib/misc/LobbyStatus'
import { PlayerState } from '@/lib/misc/PlayerState'
import { SanitizedQuestion } from '@/lib/misc/QuestionSanitizer'
import { redirect } from 'next/navigation'
import { Question, QuizTheme } from '@/lib/misc/QuizFile'

export interface HostLobbyState {
  code: number
  status: LobbyStatus
  players: PlayerState[]
  currentQuestion?: Question
  sanatizedQuestion?: SanitizedQuestion
  currentQuestionNumber: number
  totalQuestions: number
  answers: Answer[]
  theme: QuizTheme
  timeout?: number
}

const HostLobbyStateContext = createContext<{
  hostLobbyState: HostLobbyState | null
  setHostLobbyState: (hostLobbyState: HostLobbyState | null) => void
} | null>(null)

export const HostLobbyStateProvider = ({ children }: { children: React.ReactNode }) => {
  const [hostLobbyState, setHostLobbyState] = React.useState<HostLobbyState | null>(null)
  const hostLobbyStateRef = useRef<HostLobbyState | null>(null)
  const { onEvent, isConnected } = useWebSocket()

  useEffect(() => {
    hostLobbyStateRef.current = hostLobbyState
  }, [hostLobbyState])

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

    const unsubscribePlayerUpdate = onEvent('playerUpdate', (ctx) => {
      setHostLobbyState(prevHostLobbyState => {
        if (!prevHostLobbyState) return null

        const players = prevHostLobbyState.players.map(player => 
          player.id === ctx.player.id ? { ...ctx.player } : player
        )

        players.sort((a, b) => b.score - a.score)

        return {
          ...prevHostLobbyState,
          players: players
        }
      })
    })

    const unsubscribeLobbyStatusUpdate = onEvent('lobbyStatusUpdate', (ctx) => {
      setHostLobbyState(prevHostLobbyState => {
        if (!prevHostLobbyState) return null

        if (ctx.status === LobbyStatus.question) {
          const newTotalQuestions = ctx.totalQuestions !== undefined
            ? ctx.totalQuestions
            : prevHostLobbyState.totalQuestions
          
          const newCurrentQuestionNumber = ctx.totalQuestions !== undefined
            ? 1
            : prevHostLobbyState.currentQuestionNumber + 1

          return {
            ...prevHostLobbyState,
            status: ctx.status,
            currentQuestion: ctx.currentQuestion,
            sanatizedQuestion: ctx.sanitizedQuestion,
            currentQuestionNumber: newCurrentQuestionNumber,
            totalQuestions: newTotalQuestions,
            timeout: ctx.timeout,
          }
        }

        if (ctx.status === LobbyStatus.slide) {
          return {
            ...prevHostLobbyState,
            status: ctx.status,
            currentQuestion: ctx.currentQuestion,
            sanatizedQuestion: undefined,
            currentQuestionNumber: 0,
            timeout: undefined,
            totalQuestions: ctx.totalQuestions ?? 0,
          }
        }

        return {
          ...prevHostLobbyState,
          status: ctx.status,
          timeout: ctx.timeout,
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

    const unsubscribeLobbyDeleted = onEvent('lobbyDeleted', (ctx) => {
      if (LobbyStatus.end === hostLobbyStateRef.current?.status) return

      sessionStorage.setItem('messageTitle', 'Lobby Deleted')
      sessionStorage.setItem('messageDescription', ctx.reason)
      redirect('/message')
    })

    return () => {
      unsubscribePlayerJoined()
      unsubscribePlayerLeft()
      unsubscribePlayerUpdate()
      unsubscribeUpdateLobbyAnswers()
      unsubscribeLobbyStatusUpdate()
      unsubscribeLobbyDeleted()
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