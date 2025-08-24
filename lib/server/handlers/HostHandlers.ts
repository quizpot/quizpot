import { sendEvent } from "../managers/EventManager"
import { createLobby, getLobbyByCode, getLobbyByHostId, leaveLobby, startLobby } from "@/lib/server/managers/LobbyManager"
import { HandlerContext } from "./HandlerContext"

export function handleCreateLobby({ client, ctx }: HandlerContext) {
  const { hostId, settings, file } = ctx

  if (!hostId || !settings || !file) {
    return sendEvent(client, 'createLobbyError', {
      error: "Invalid parameters.",
    })
  }

  const newLobbyCode = createLobby(client, file, settings)

  if (typeof newLobbyCode !== 'number') {
    return sendEvent(client, 'createLobbyError', {
      error: "Couldn't create lobby, " + newLobbyCode.message,
    })
  }

  sendEvent(client, 'lobbyCreated', {
    lobby: getLobbyByCode(newLobbyCode),
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
      error: "Lobby not found."
    })
  }

  const res = startLobby(lobby.code)

  if (res instanceof Error) {
    console.log('start lobby message: ', res.message)
    return sendEvent(client, 'lobbyStartedError', {
      error: res.message
    })
  }
}