/* eslint-disable no-var */
import { WebSocketClient } from "./WSClientManager"
import { MultipleChoiceAnswer, QuizFile, ShortAnswerAnswer, TrueFalseAnswer } from "../../misc/QuizFile"
import { sendEvent } from "./EventManager"
import { generateName } from "../../misc/name/generateName"
import { startGame } from "../handlers/GameHandlers"
import { LobbyStatus } from "@/lib/misc/LobbyStatus"

export interface Lobby {
  code: number
  host: WebSocketClient
  quiz: QuizFile
  players: Player[]
  status: LobbyStatus
  currentQuestionIndex: number
  answers: Answer[]
}

export interface Player {
  client: WebSocketClient
  name: string
  score: number
}

export interface Answer {
  playerId: string
  answer: MultipleChoiceAnswer | TrueFalseAnswer | ShortAnswerAnswer
  timeTaken: number
  isCorrect: boolean
}

declare global {
  var lobbyManager: {
    lobbies: Map<number, Lobby>
    hostLobbyMap: Map<string, Lobby>
    playerLobbyMap: Map<string, Lobby>
  }
}

function initializeLobbyManager() {
  if (!globalThis.lobbyManager) {
    globalThis.lobbyManager = {
      lobbies: new Map<number, Lobby>(),
      hostLobbyMap: new Map<string, Lobby>(),
      playerLobbyMap: new Map<string, Lobby>(),
    }
  }
}

const getLobbies = () => {
  initializeLobbyManager()
  return globalThis.lobbyManager.lobbies
}

const getHostLobbyMap = () => {
  initializeLobbyManager()
  return globalThis.lobbyManager.hostLobbyMap
}

const getPlayerLobbyMap = () => {
  initializeLobbyManager()
  return globalThis.lobbyManager.playerLobbyMap
}

export const getLobbiesSize = () => getLobbies().size

export const getLobbyByHostId = (hostId: string) => getHostLobbyMap().get(hostId)

export const getLobbyByCode = (code: number) => getLobbies().get(code)

export const getLobbyByPlayerId = (playerId: string) => getPlayerLobbyMap().get(playerId)

export const getGlobalPlayerCount = () => getPlayerLobbyMap().size

export const createLobby = (host: WebSocketClient, quiz: QuizFile): number | Error => {
  if (getHostLobbyMap().has(host.id)) {
    return new Error("You already have a lobby")
  }

  const code = generateLobbyCode()

  const lobby: Lobby = {
    code,
    host,
    quiz,
    players: [],
    status: LobbyStatus.waiting,
    currentQuestionIndex: 0,
    answers: [],
  }

  getLobbies().set(code, lobby)
  getHostLobbyMap().set(host.id, lobby)

  console.log('[LobbyManager] Lobby created with code:', code)

  return code
}

export const deleteLobby = (host: WebSocketClient, reason?: string): true | Error => {
  const lobby = getHostLobbyMap().get(host.id)

  if (!lobby) return new Error("Lobby not found")

  lobby.players.forEach(player => {
    sendEvent(player.client, 'lobbyDeleted', { reason })
    getPlayerLobbyMap().delete(player.client.id)
  })

  getLobbies().delete(lobby.code)
  getHostLobbyMap().delete(host.id)

  console.log('[LobbyManager] Lobby deleted with code:', lobby.code)

  return true
}

export const joinLobby = (code: number, name: string | undefined, player: WebSocketClient): true | Error => {
  if (getHostLobbyMap().has(player.id)) {
    return new Error("You are hosting a lobby")
  }

  const lobby = getLobbies().get(code)

  if (!lobby) return new Error("Lobby not found")

  const playerObj = {
    player: {
      client: player,
      name: name || generateName(),
      score: 0,
    }
  }
  
  lobby.players.push(playerObj.player)

  console.log('[LobbyManager] Sending host playerJoined event:', lobby.host.id)
  sendEvent(lobby.host, 'playerJoined', playerObj)
  
  getPlayerLobbyMap().set(player.id, lobby)

  return true
}

export const leaveLobby = (player: WebSocketClient): true | Error => {
  const lobby = getPlayerLobbyMap().get(player.id)

  if (!lobby) return new Error("Player not found in any lobby")

  const playerIndex = lobby.players.findIndex(p => p.client.id === player.id)
  const leavingPlayer = lobby.players[playerIndex]

  const payload = { player: { id: leavingPlayer.client.id, name: leavingPlayer.name } }

  lobby.players.forEach(player => {
    sendEvent(player.client, 'playerLeft', payload)
  })

  if (playerIndex > -1) {
    lobby.players.splice(playerIndex, 1)
  }

  sendEvent(lobby.host, 'playerLeft', payload)

  getPlayerLobbyMap().delete(player.id)

  return true
}

export const startLobby = (code: number): true | Error => {
  const lobby = getLobbyByCode(code)

  if (!lobby) return new Error("Lobby not found")
  if (lobby.status !== 'waiting') return new Error("Lobby already started")

  const players = getLobbyPlayers(code)

  if (players instanceof Error) return players

  if (players.length < 2) return new Error("Lobby must have at least 2 players")

  startGame(lobby)
  return true
}

export const getLobbyQuestionIndex = (code: number): number | Error => {
  const lobby = getLobbyByCode(code)

  if (!lobby) return new Error("Lobby not found")
  if (lobby.status == 'waiting') return new Error("Lobby not started")

  return lobby.currentQuestionIndex
}

export const getLobbyPlayers = (code: number): Player[] | Error => {
  const lobby = getLobbyByCode(code)

  if (!lobby) return new Error("Lobby not found")

  return lobby.players
}

export const getPlayerScore = (code: number, playerId: string): number | Error => {
  const lobby = getLobbyByCode(code)

  if (!lobby) return new Error("Lobby not found")

  const player = lobby.players.find(player => player.client.id === playerId)

  if (!player) return new Error("Player not found")

  return player.score
}

export const updatePlayerScore = (code: number, playerId: string, score: number): true | Error => {
  const lobby = getLobbyByCode(code)

  if (!lobby) return new Error("Lobby not found")

  const player = lobby.players.find(player => player.client.id === playerId)

  if (!player) return new Error("Player not found")

  player.score = score

  const payload = {
    player: {
      id: player.client.id,
      name: player.name,
      score: player.score,
    },
  }

  sendEvent(player.client, 'playerScoreUpdate', payload)
  sendEvent(lobby.host, 'playerScoreUpdate', payload)

  return true
}

export const updateQuestionIndex = (lobbyCode: number, index: number): true | Error => {
  const lobby = getLobbyByCode(lobbyCode)

  if (!lobby) return new Error("Lobby not found")

  lobby.currentQuestionIndex = index

  const payload = {
    currentQuestionIndex: index,
  }

  lobby.players.forEach(player => {
    sendEvent(player.client, 'currentQuestionIndexUpdate', payload)
  })

  sendEvent(lobby.host, 'currentQuestionIndexUpdate', payload)

  return true
}

export const updateLobbyAnswers = (code: number, answer: Answer): true | Error => {
  const lobby = getLobbyByCode(code)

  if (!lobby) return new Error("Lobby not found")

  lobby.answers.push(answer)

  const payload = {
    answerCount: lobby.answers.length,
  }

  lobby.players.forEach(player => {
    sendEvent(player.client, 'updateLobbyAnswerCount', payload)
  })

  sendEvent(lobby.host, 'updateLobbyAnswerCount', payload)

  return true
}

const generateLobbyCode = (): number => {
  let code = 0

  do {
    code = Math.floor(Math.random() * 900000 + 100000)
  } while (getLobbies().has(code))

  return code
}