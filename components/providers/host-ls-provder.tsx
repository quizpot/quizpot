"use client"

import React, { createContext, useContext, useEffect, useReducer, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { AllHostServerEvents, HostLobbyState, HostLobbyStatusUpdate, LobbyStatus } from "@quizpot/quizcore"
import { useWebSocket } from "./ws-provider"
import MessagePage from "../ui/message-page"

type InitAction = { event: "INIT"; state: HostLobbyState | null }
type ReducerAction = AllHostServerEvents | InitAction

interface HostProviderState {
  lobby: HostLobbyState | null
  answerCount: number
}

const INITIAL: HostProviderState = { lobby: null, answerCount: 0 }

function reducer(state: HostProviderState, action: ReducerAction): HostProviderState {
  if (state.lobby === null && action.event !== "INIT") return state

  switch (action.event) {
    case "INIT":
      return { lobby: action.state, answerCount: 0 }

    case "PLAYER_JOINED":
      return {
        ...state,
        lobby: {
          ...state.lobby!,
          players: [...state.lobby!.players, action.payload.player],
        },
      }

    case "PLAYER_LEFT":
      return {
        ...state,
        lobby: {
          ...state.lobby!,
          players: state.lobby!.players.filter(
            (p) => p.id !== action.payload.playerId
          ),
        },
      }

    case "PLAYER_UPDATE": {
      const updated = state.lobby!.players.map((p) =>
        p.id === action.payload.player.id ? action.payload.player : p
      )
      return {
        ...state,
        lobby: {
          ...state.lobby!,
          players: updated.sort((a, b) => b.score - a.score),
        },
      }
    }

    case "UPDATE_LOBBY_ANSWERS":
      return { ...state, answerCount: action.payload.count }

    case "LOBBY_STATUS_UPDATE": {
      const { payload, stepNumber } = action
      const base: HostLobbyState = { ...state.lobby!, stepNumber }
      let nextAnswerCount = state.answerCount

      const nextLobby: HostLobbyState = {
        ...base,
        status: payload.status,
      }

      switch (payload.status) {
        case LobbyStatus.question:
          nextAnswerCount = 0
          nextLobby.currentStep = { type: "question", data: payload.question }
          nextLobby.timeout = new Date(payload.timeoutStartedAt).toISOString()
          nextLobby.answers = []
          break

        case LobbyStatus.slide:
          nextAnswerCount = 0
          nextLobby.currentStep = { type: "slide", data: payload.slide }
          nextLobby.timeout = undefined
          nextLobby.answers = []
          break

        case LobbyStatus.answer:
          // Players are now answering — show the host a countdown.
          // timeoutStartedAt is required in the schema so no guard needed.
          nextLobby.timeout = new Date(payload.timeoutStartedAt).toISOString()
          break

        case LobbyStatus.answers:
          // Review phase — store the answers so the host can highlight
          // correct/incorrect choices. Fall back to existing answers if the
          // server omits them (e.g. for slides with no answers).
          nextLobby.answers = (payload.answers ?? state.lobby!.answers) as any[]
          nextLobby.timeout = undefined
          break

        case LobbyStatus.score:
          // Leaderboard phase — server sends the sorted leaderboard.
          nextLobby.players = payload.leaderboard
          nextLobby.timeout = undefined
          break

        case LobbyStatus.end:
          // Game over — clear transient fields.
          nextLobby.timeout = undefined
          nextLobby.currentStep = undefined
          break

        case LobbyStatus.waiting:
          // Shouldn't normally arrive mid-game but handle it cleanly.
          nextLobby.timeout = undefined
          nextLobby.currentStep = undefined
          break
      }

      return { lobby: nextLobby, answerCount: nextAnswerCount }
    }

    // Events the host receives but that don't affect host lobby state.
    case "LOBBY_JOINED":
    case "PLAYER_ANSWER_RESULT":
    case "PLAYER_KICKED":
    case "HOST_STATUS":
    case "SERVER_ERROR":
    case "LOBBY_DELETED":
      return state

    default:
      return state
  }
}

const HostLobbyContext = createContext<{
  hostLobbyState: HostLobbyState | null
  answerCount: number
  setHostLobbyState: (state: HostLobbyState | null) => void
} | null>(null)

export const HostLobbyStateProvider = ({ children }: { children: React.ReactNode }) => {
  const [{ lobby, answerCount }, dispatch] = useReducer(reducer, INITIAL)
  const { onEvent } = useWebSocket()
  const router = useRouter()

  const [message, setMessage] = useState<string | null>(null)

  const lobbyRef = useRef(lobby)
  useEffect(() => {
    lobbyRef.current = lobby
  }, [lobby])

  useEffect(() => {
    const unsubs: Array<() => void> = [
      onEvent("LOBBY_JOINED", (ctx) => {
        if (ctx.payload.role !== "host") return
        dispatch({ event: "INIT", state: ctx.payload.state })
      }),

      onEvent("PLAYER_JOINED", (ctx) => dispatch(ctx)),
      onEvent("PLAYER_LEFT", (ctx) => dispatch(ctx)),
      onEvent("PLAYER_UPDATE", (ctx) => dispatch(ctx)),
      onEvent("UPDATE_LOBBY_ANSWERS", (ctx) => dispatch(ctx)),
      onEvent("LOBBY_STATUS_UPDATE", (ctx) => dispatch(ctx as unknown as HostLobbyStatusUpdate)),

      onEvent("LOBBY_DELETED", (ctx) => {
        if (lobbyRef.current?.status === LobbyStatus.end) return
        setMessage(ctx.payload.reason)
      }),
    ]

    return () => unsubs.forEach((unsub) => unsub())
  }, [onEvent, router])

  if (message) return <MessagePage message={message} />

  return (
    <HostLobbyContext.Provider
      value={{
        hostLobbyState: lobby,
        answerCount,
        setHostLobbyState: (state) => dispatch({ event: "INIT", state }),
      }}
    >
      {children}
    </HostLobbyContext.Provider>
  )
}

export const useHostLobbyState = () => {
  const context = useContext(HostLobbyContext)
  if (!context)
    throw new Error("useHostLobbyState must be used within HostLobbyStateProvider")
  return context
}