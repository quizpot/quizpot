import { sendEvent } from "../managers/EventManager"
import { createLobby, getLobbyByCode, getLobbyByHostId, leaveLobby, startLobby } from "@/lib/server/managers/LobbyManager"
import { HandlerContext } from "./HandlerContext"

export function handleCreateLobby({ client, ctx }: HandlerContext) {
  const { hostId, settings, file } = ctx

  if (!hostId || !settings || !file) {
    return sendEvent(client, 'createLobbyError', {
      message: "Invalid parameters.",
    })
  }

  const newLobbyCode = createLobby(client, file, settings)

  if (typeof newLobbyCode !== 'number') {
    return sendEvent(client, 'createLobbyError', {
      message: "Couldn't create lobby: " + newLobbyCode.message,
    })
  }

  const lobby = getLobbyByCode(newLobbyCode)

  if (!lobby) {
    return sendEvent(client, 'createLobbyError', {
      message: "Couldn't find created lobby.",
    })
  }

  sendEvent(client, 'lobbyCreated', {
    lobbyState: {
      code: lobby.code,
      status: lobby.status,
      players: [],
      answers: [],
      currentQuestionNumber: 0,
      totalQuestions: lobby.quiz.questions.length,
      theme: lobby.quiz.theme,
    }
  })
}

export function handlePlayerKick({ client, ctx }: HandlerContext) {
  const { playerId } = ctx
  const initiator = client.id
  const lobby = getLobbyByHostId(initiator)

  if (!lobby) {
    console.log('lobby not found')
    return
  }

  const player = lobby.players.find(player => player.client.id === playerId)

  if (!player) {
    console.log('player not found')
    return
  }

  leaveLobby(player.client)
}

export function handleStartLobby({ client }: HandlerContext) {
  const lobby = getLobbyByHostId(client.id)

  if (!lobby) {
    return sendEvent(client, 'lobbyStartedError', {
      message: "Lobby not found."
    })
  }

  const res = startLobby(lobby.code)

  if (res instanceof Error) {
    return sendEvent(client, 'lobbyStartedError', {
      message: res.message
    })
  }
}