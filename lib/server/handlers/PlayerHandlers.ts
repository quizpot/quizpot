import { sendEvent } from "../managers/EventManager"
import { getLobbyByCode, getLobbyByHostId, getLobbyByPlayerId, getLobbyPlayers, joinLobby } from "../managers/LobbyManager"
import { HandlerContext } from "./HandlerContext"

export function handleJoinLobby({ client, ctx }: HandlerContext) {
  const { code, name } = ctx

  if (!code) {
    return sendEvent(client, 'lobbyJoinError', {
      error: "No code provided.",
    })
  }

  const lobby = getLobbyByCode(code)

  if (!lobby) {
    return sendEvent(client, 'lobbyJoinError', {
      error: "Lobby not found.",
    })
  }

  if (getLobbyByHostId(client.id)) {
    return sendEvent(client, 'lobbyJoinError', {
      error: "You are hosting a lobby.",
    })
  }

  if (getLobbyByPlayerId(client.id)) {
    return sendEvent(client, 'lobbyJoinError', {
      error: "You are already in a lobby.",
    })
  }

  const res = joinLobby(code, name, client)

  if (res instanceof Error) {
    return sendEvent(client, 'lobbyJoinError', {
      error: res.message,
    })
  }

  const payload = {
    lobby: {
      code: lobby.code,
      status: 'waiting',
      player: {
        id: client.id,
        name: name,
        score: 0,
      },
      currentQuestionNumber: 0,
      totalQuestions: lobby.quiz.questions.length,
    }
  }

  sendEvent(client, 'lobbyJoined', payload)
}

// Deprecated
// export function handlePlayerSync({ client }: HandlerContext) {
//   const lobby = getLobbyByPlayerId(client.id)

//   if (!lobby) return

//   const players = getLobbyPlayers(lobby.code)

//   if (!players) return
//   if (players instanceof Error) return

//   const player = players.find(player => player.client.id === client.id)

//   if (!player) return

//   const payload = {
//     player: {
//       name: player.name,
//       score: player.score,
//     },
//   }

//   sendEvent(client, 'syncPlayer', payload)
// }