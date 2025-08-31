import { LobbyStatus } from "@/lib/misc/LobbyStatus"
import { sendEvent } from "../managers/EventManager"
import { getLobbyByCode, getLobbyByHostId, getLobbyByPlayerId, joinLobby } from "../managers/LobbyManager"
import { HandlerContext } from "./HandlerContext"

export function handleJoinLobby({ client, ctx }: HandlerContext) {
  const { code, name } = ctx

  if (!code) {
    return sendEvent(client, 'lobbyJoinError', {
      message: "No code provided.",
    })
  }

  const lobby = getLobbyByCode(code)

  if (!lobby) {
    return sendEvent(client, 'lobbyJoinError', {
      message: "Lobby not found.",
    })
  }

  if (getLobbyByHostId(client.id)) {
    return sendEvent(client, 'lobbyJoinError', {
      message: "You are hosting a lobby.",
    })
  }

  if (getLobbyByPlayerId(client.id)) {
    return sendEvent(client, 'lobbyJoinError', {
      message: "You are already in a lobby.",
    })
  }

  const res = joinLobby(code, name, client)

  if (res instanceof Error) {
    return sendEvent(client, 'lobbyJoinError', {
      message: res.message,
    })
  }

  const payload = {
    lobby: {
      code: lobby.code,
      status: LobbyStatus.waiting,
      player: {
        id: client.id,
        name: name,
        score: 0,
        streak: 0,
      },
      currentQuestionNumber: 0,
      totalQuestions: lobby.quiz.questions.length,
      correctAnswer: false
    }
  }

  sendEvent(client, 'lobbyJoined', payload)
}