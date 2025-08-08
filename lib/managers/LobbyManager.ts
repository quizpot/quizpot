import { getWSClientById, WebSocketClient } from "./WSClientManager"
import { QuizFile } from "../QuizFile"
import { sendEvent } from "./EventManager"

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
  started: boolean
  currentQuestionIndex: number
}

export interface Player {
  client: WebSocketClient
  name: string
  score: number
}

/**
 * Persist lobbies in globalThis to avoid Next.js hotreload trickery
 */
export function initializeLobbyManager() {
  if (!globalThis.lobbyManager) {
    globalThis.lobbyManager = {
      lobbies: new Map<number, Lobby>(),
      hostLobbyMap: new Map<string, Lobby>(),
      playerLobbyMap: new Map<string, Lobby>(),
    }
  }
}

/**
 * A helper function to get the lobbies Map, ensuring it's ready first.
 */
const getLobbies = () => {
  initializeLobbyManager()
  return globalThis.lobbyManager.lobbies
}

/**
 * A helper function to get the hostLobbyMap, ensuring it's ready first.
 */
const getHostLobbyMap = () => {
  initializeLobbyManager()
  return globalThis.lobbyManager.hostLobbyMap
}

/**
 * A helper function to get the playerLobbyMap, ensuring it's ready first.
 */
const getPlayerLobbyMap = () => {
  initializeLobbyManager()
  return globalThis.lobbyManager.playerLobbyMap
}

/**
 * Get the count of lobbies
 * @returns number of lobbies
 */
export const getLobbiesSize = () => getLobbies().size

export const getLobbyByHostId = (hostId: string) => getHostLobbyMap().get(hostId)

export const getLobbyByCode = (code: number) => getLobbies().get(code)

export const getLobbyByPlayerId = (playerId: string) => getPlayerLobbyMap().get(playerId)

export const getPlayerCount = () => getPlayerLobbyMap().size

export const createLobby = (hostId: string, quiz: QuizFile): number | Error => {
  if (getHostLobbyMap().has(hostId)) {
    return new Error("You already have a lobby")
  }

  const code = Math.floor(Math.random() * 900000 + 100000)
  const newLobby: Lobby = {
    code,
    hostId,
    quiz,
    players: [],
    started: false,
    currentQuestionIndex: 0,
  }

  getLobbies().set(code, newLobby)
  getHostLobbyMap().set(hostId, newLobby)

  return code
}


export const deleteLobby = (hostId: string) => {
  const lobby = getHostLobbyMap().get(hostId)
  if (!lobby) return

  getLobbies().delete(lobby.code)
  getHostLobbyMap().delete(hostId)
  getPlayerLobbyMap().forEach((lobby, playerId) => {
    if (lobby.code === lobby.code) {
      getPlayerLobbyMap().delete(playerId)
    }
  })
}

export const joinLobby = (code: number, client: WebSocketClient): Error | true => {
  if (getHostLobbyMap().has(client.id)) {
    return new Error("You are hosting a lobby")
  }

  const lobby = getLobbies().get(code)
  if (!lobby) return new Error("Lobby not found")

  // TODO: generate a random name for the player
  lobby.players.push({
    client,
    name: client.id,
    score: 0,
  })

  const players = getLobbyPlayers(code)

  players.forEach(player => {
    sendEvent(player.client, 'playerJoined', { player: { name: client.id, score: 0 } })
  })

  const host = getWSClientById(lobby.hostId)

  if (host) {
    sendEvent(host, 'playerJoined', { player: { name: client.id, score: 0 } })
  }
  
  getPlayerLobbyMap().set(client.id, lobby)

  return true
}

export const leaveLobby = (client: WebSocketClient): Error | true => {
  const lobby = getPlayerLobbyMap().get(client.id)

  if (!lobby) {
    return new Error("Player not found in any lobby")
  }

  const playerIndex = lobby.players.findIndex(player => player.client.id === client.id)
  
  if (playerIndex > -1) {
    lobby.players.splice(playerIndex, 1)
  }

  const players = getLobbyPlayers(lobby.code)

  players.forEach(player => {
    sendEvent(player.client, 'playerLeft', { player: { name: client.id, score: 0 } })
  })

  const host = getWSClientById(lobby.hostId)

  if (host) {
    sendEvent(host, 'playerLeft', { player: { name: client.id, score: 0 } })
  }

  getPlayerLobbyMap().delete(client.id)

  return true
}

export const startLobby = (code: number): Error | true => {
  const lobby = getLobbyByCode(code)

  if (!lobby) {
    return new Error("Lobby not found")
  }

  if (lobby.started) {
    return new Error("Lobby already started")
  }

  const players = getLobbyPlayers(code)

  players.forEach(player => {
    sendEvent(player.client, 'lobbyStarted', {})
  })

  const host = getWSClientById(lobby.hostId)

  if (host) {
    sendEvent(host, 'lobbyStarted', {})
  }

  lobby.started = true

  return true
}

/**
 * Get the current question index for a lobby
 * @param code 
 * @returns -1 if lobby not found, current question index otherwise
 */
export const getLobbyQuestionIndex = (code: number): number => {
  const lobby = getLobbyByCode(code)

  if (!lobby) {
    return -1
  }

  return lobby.currentQuestionIndex
}

export const getLobbyPlayers = (code: number): Player[] => {
  const lobby = getLobbyByCode(code)

  if (!lobby) {
    return []
  }

  return lobby.players
}

export const getPlayerScore = (code: number, playerId: string): number => {
  const lobby = getLobbyByCode(code)

  if (!lobby) {
    return 0
  }

  const player = lobby.players.find(player => player.name === playerId)

  if (!player) {
    return 0
  }

  return player.score
}

export const updatePlayerScore = (code: number, playerId: string, score: number) => {
  const lobby = getLobbyByCode(code)

  if (!lobby) {
    return
  }

  const player = lobby.players.find(player => player.name === playerId)

  if (!player) {
    return
  }

  player.score = score

  sendEvent(player.client, 'playerScoreUpdate', { player: { name: playerId, score } })

  const host = getWSClientById(lobby.hostId)

  if (host) {
    sendEvent(host, 'playerScoreUpdate', { player: { name: playerId, score } })
  }
}