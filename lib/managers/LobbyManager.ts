import { WebSocketClient } from "./WSClientManager"
import { QuizFile } from "../QuizFile"

export interface Lobby {
  code: number
  hostId: string
  quiz: QuizFile
  players: Player[]
}

export interface Player {
  id: string
  name: string
  ws: WebSocketClient
}

const lobbies: Lobby[] = []

export const getLobbies = () => lobbies

export const getLobbyByHostId = (hostId: string) => lobbies.find(lobby => lobby.hostId === hostId)

export const getLobbyByCode = (code: number) => lobbies.find(lobby => lobby.code === code)

export const createLobby = (hostId: string, quiz: QuizFile): number | Error => {
  if (getLobbyByHostId(hostId)) return new Error("You already have a lobby")

  const code = Math.floor(Math.random() * 900000 + 100000)

  lobbies.push({
    code,
    hostId,
    quiz,
    players: []
  })

  return code
}

export const deleteLobby = (hostId: string) => {
  const lobby = getLobbyByHostId(hostId)
  if (!lobby) return

  lobbies.splice(lobbies.indexOf(lobby), 1)
}

export const joinLobby = (code: number, ws: WebSocketClient): Error | true => {
  const hosting = getLobbyByHostId(ws.id)
  if (hosting) return new Error("You are hosting a lobby")

  const lobby = getLobbyByCode(code)
  if (!lobby) return new Error("Lobby not found")

  lobby.players.push({
    id: ws.id,
    name: ws.id,
    ws
  })

  return true
}

export const leaveLobby = (code: number, ws: WebSocketClient): Error | true => {
  const lobby = getLobbyByCode(code)
  if (!lobby) return new Error("Lobby not found")

  const playerIndex = lobby.players.findIndex(player => player.ws.id === ws.id)
  if (playerIndex === -1) return new Error("Player not found")

  lobby.players.splice(playerIndex, 1)

  return true
}
