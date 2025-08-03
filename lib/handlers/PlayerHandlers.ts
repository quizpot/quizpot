import { sendEvent } from "../managers/EventManager"
import { getLobbyByCode, getLobbyByHostId, getLobbyByPlayerId, joinLobby } from "../managers/LobbyManager"
import { HandlerContext } from "./HandlerContext"

export function handleLobbyJoin({ client, ctx }: HandlerContext) {
  const { code } = ctx

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

  joinLobby(code, client)

  sendEvent(client, 'lobbyJoined', {
    lobby,
  })
}