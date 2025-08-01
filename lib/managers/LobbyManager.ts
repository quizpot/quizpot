import { WebSocketClient } from "./WSClientManager"
import { QuizFile } from "../QuizFile"

declare global {
  // eslint-disable-next-line no-var
  var lobbyManager: {
    lobbies: Map<number, Lobby>
    hostLobbyMap: Map<string, Lobby>
    playerLobbyMap: Map<string, Lobby>
  }
}

export interface Lobby {
  code: number
  hostId: string
  quiz: QuizFile
  players: Player[]
}

export interface Player {
  client: WebSocketClient
  name: string
}

/**
 * Persist lobbies in globalThis to avoid Next.js hotreload trickery
 */
if (!globalThis.wsClientManager) {
  globalThis.lobbyManager = {
    lobbies: new Map<number, Lobby>(),
    hostLobbyMap: new Map<string, Lobby>(),
    playerLobbyMap: new Map<string, Lobby>(),
  }
}

const lobbies = globalThis.lobbyManager.lobbies
const hostLobbyMap = globalThis.lobbyManager.hostLobbyMap
const playerLobbyMap = globalThis.lobbyManager.playerLobbyMap

export const getLobbyByHostId = (hostId: string) => hostLobbyMap.get(hostId)

export const getLobbyByCode = (code: number) => lobbies.get(code)

export const createLobby = (hostId: string, quiz: QuizFile): number | Error => {
  if (hostLobbyMap.has(hostId)) {
    return new Error("You already have a lobby")
  }

  const code = Math.floor(Math.random() * 900000 + 100000)
  const newLobby: Lobby = {
    code,
    hostId,
    quiz,
    players: []
  }

  lobbies.set(code, newLobby)
  hostLobbyMap.set(hostId, newLobby)

  return code
}


export const deleteLobby = (hostId: string) => {
  const lobby = hostLobbyMap.get(hostId)
  if (!lobby) return

  lobbies.delete(lobby.code)
  hostLobbyMap.delete(hostId)
}

export const joinLobby = (code: number, client: WebSocketClient): Error | true => {
  if (hostLobbyMap.has(client.id)) {
    return new Error("You are hosting a lobby")
  }

  const lobby = lobbies.get(code)
  if (!lobby) return new Error("Lobby not found")

  // TODO: generate a random name for the player
  lobby.players.push({
    client,
    name: client.id,
  })

  playerLobbyMap.set(client.id, lobby)

  return true
}

export const leaveLobby = (client: WebSocketClient): Error | true => {
  const lobby = playerLobbyMap.get(client.id)

  if (!lobby) {
    return new Error("Player not found in any lobby")
  }

  const playerIndex = lobby.players.findIndex(player => player.client.id === client.id)
  
  if (playerIndex > -1) {
    lobby.players.splice(playerIndex, 1)
  }

  playerLobbyMap.delete(client.id)

  return true
}
