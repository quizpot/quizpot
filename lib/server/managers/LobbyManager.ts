import { WebSocketClient } from "./WSClientManager"
import { MultipleChoiceAnswer, QuizFile, ShortAnswerAnswer, SlideQuestion, TrueFalseAnswer } from "../../QuizFile"
import { sendEvent } from "./EventManager"
import { generateUniqueName } from "../../misc/name/NameUtil"
import { startGame } from "../handlers/GameHandler"
import { LobbyStatus } from "@/lib/misc/LobbyStatus"
import { devLog } from "@/lib/misc/Log"
import { log } from "console"
import { LobbyStatusUpdatePayload } from "../ServerEvents"
import { sanitizeQuestion } from "@/lib/server/QuestionSanitizer"

export interface Lobby {
  code: number
  host: WebSocketClient
  quiz: QuizFile
  players: Player[]
  status: LobbyStatus
  currentQuestionIndex: number
  answers: Answer[]
  settings: LobbySettings
  answerTimeout: NodeJS.Timeout | null
  answerTimestamp: number | null
}

export interface LobbySettings {
  customNames: boolean
  questionsOnDevice: boolean
}

export interface Player {
  client: WebSocketClient
  name: string
  score: number
  streak: number
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

export const getInstanceLobbyCount = () => getLobbies().size

export const getLobbyByHostId = (hostId: string) => getHostLobbyMap().get(hostId)

export const getLobbyByCode = (code: number) => getLobbies().get(code)

export const getLobbyByPlayerId = (playerId: string) => getPlayerLobbyMap().get(playerId)

export const getInstancePlayerCount = () => getPlayerLobbyMap().size

export const getLobbySettings = (code: number): LobbySettings | Error => {
  const lobby = getLobbyByCode(code)

  if (!lobby) return new Error("Lobby not found")

  return lobby.settings
}

export const createLobby = (host: WebSocketClient, quiz: QuizFile, settings: LobbySettings): number | Error => {
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
    answerTimeout: null,
    answerTimestamp: null,
    settings
  }

  getLobbies().set(code, lobby)
  getHostLobbyMap().set(host.id, lobby)

  log('LobbyManager', 'Lobby created with code:', code)

  return code
}

export const deleteLobby = (host: WebSocketClient, reason?: string): true | Error => {
  const lobby = getHostLobbyMap().get(host.id)

  if (!lobby) return new Error("Lobby not found")

  lobby.players.forEach(player => {
    sendEvent(player.client, 'lobbyDeleted', { reason: reason || 'Unknown reason' })
    getPlayerLobbyMap().delete(player.client.id)
  })

  sendEvent(host, 'lobbyDeleted', { reason: reason || 'Unknown reason' })

  getLobbies().delete(lobby.code)
  getHostLobbyMap().delete(host.id)

  log('LobbyManager', 'Lobby deleted with code:', lobby.code)

  return true
}

export const joinLobby = (code: number, name: string | null, player: WebSocketClient): string | Error => {
  if (getHostLobbyMap().has(player.id)) {
    return new Error("You are hosting a lobby")
  }

  const lobby = getLobbies().get(code)

  if (!lobby) return new Error("Lobby not found")

  if (!lobby.settings.customNames) {
    const uniqueName = generateUniqueName(lobby.players)

    if (uniqueName instanceof Error) return uniqueName
    
    name = uniqueName
  }
  
  if (!name) return new Error("Name not provided")

  const playerObj = {
    player: {
      id: player.id,
      name: name,
      score: 0,
      streak: 0,
    }
  }
  
  lobby.players.push({
    ...playerObj.player,
    client: player,
  })

  devLog('LobbyManager', 'Player joined a lobby with code:', lobby.code)
  
  sendEvent(lobby.host, 'playerJoined', playerObj)
  
  getPlayerLobbyMap().set(player.id, lobby)

  return name
}

export const leaveLobby = (player: WebSocketClient): true | Error => {
  const lobby = getPlayerLobbyMap().get(player.id)

  if (!lobby) return new Error("Player not found in any lobby")

  const playerIndex = lobby.players.findIndex(p => p.client.id === player.id)
  const leavingPlayer = lobby.players[playerIndex]

  const payload = { 
    player: { 
      id: leavingPlayer.client.id, 
      name: leavingPlayer.name, 
      score: leavingPlayer.score,
      streak: leavingPlayer.streak,
    } 
  }

  if (playerIndex > -1) {
    lobby.players.splice(playerIndex, 1)
  }

  devLog('LobbyManager', 'Player left a lobby with code:', lobby.code)

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

  if (players.length < 1) return new Error("Lobby must have at least one player")

  log('LobbyManager', 'Lobby started with code:', lobby.code)

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
  
  lobby.players.sort((a, b) => b.score - a.score)

  const payload = {
    player: {
      id: player.client.id,
      name: player.name,
      score: player.score,
      streak: player.streak,
    },
  }

  sendEvent(player.client, 'playerUpdate', payload)
  sendEvent(lobby.host, 'playerUpdate', payload)

  return true
}

export const updateLobbyStatus = (code: number, status: LobbyStatus, timeout?: number): LobbyStatus | Error => {
  const lobby = getLobbyByCode(code)

  if (!lobby) return new Error("Lobby not found")

  lobby.status = status

  let payload: LobbyStatusUpdatePayload
  let hostPayload: LobbyStatusUpdatePayload
  let totalQuestions: number | undefined

  if (status === LobbyStatus.question && lobby.currentQuestionIndex === 0) {
    const quizQuestions = lobby.quiz.questions
    const nextSlideIndex = quizQuestions.findIndex((question, index) => index > 0 && question.questionType === 'slide')
    totalQuestions = quizQuestions
      .slice(0, nextSlideIndex !== -1 ? nextSlideIndex : quizQuestions.length)
      .filter(q => q.questionType !== 'slide')
      .length
  } else if (status === LobbyStatus.slide) {
    const quizQuestions = lobby.quiz.questions
    const nextSlideIndex = quizQuestions.findIndex((question, index) => index > lobby.currentQuestionIndex && question.questionType === 'slide')
    totalQuestions = quizQuestions
      .slice(lobby.currentQuestionIndex + 1, nextSlideIndex !== -1 ? nextSlideIndex : quizQuestions.length)
      .filter(q => q.questionType !== 'slide')
      .length
  }

  if (status === LobbyStatus.question) {
    const sanitizedQuestion = sanitizeQuestion(lobby.quiz.questions[lobby.currentQuestionIndex])
    if (sanitizedQuestion instanceof Error) return sanitizedQuestion

    payload = {
      status: LobbyStatus.question,
      sanitizedQuestion: sanitizedQuestion,
      timeout: timeout,
    }

    hostPayload = {
      status: LobbyStatus.question,
      currentQuestion: lobby.quiz.questions[lobby.currentQuestionIndex],
      sanitizedQuestion: sanitizedQuestion,
      timeout: timeout,
      totalQuestions: totalQuestions,
    }
  } else if (status === LobbyStatus.slide) {
    payload = {
      status: LobbyStatus.slide,
    }

    hostPayload = {
      status: LobbyStatus.slide,
      currentQuestion: lobby.quiz.questions[lobby.currentQuestionIndex] as SlideQuestion,
      totalQuestions: totalQuestions,
    }
  } else {
    payload = {
      status: status,
      timeout: timeout,
    }

    hostPayload = {
      status: status,
      timeout: timeout,
    }
  }

  sendEvent(lobby.host, 'lobbyStatusUpdate', hostPayload)

  lobby.players.forEach(player => {
    sendEvent(player.client, 'lobbyStatusUpdate', payload)
  })

  return status
}

// export const updateQuestionIndex = (lobbyCode: number, index: number): true | Error => {
//   const lobby = getLobbyByCode(lobbyCode)

//   if (!lobby) return new Error("Lobby not found")

//   lobby.currentQuestionIndex = index

//   const payload = {
//     currentQuestionIndex: index,
//   }

//   lobby.players.forEach(player => {
//     sendEvent(player.client, 'currentQuestionIndexUpdate', payload)
//   })

//   sendEvent(lobby.host, 'currentQuestionIndexUpdate', payload)

//   return true
// }

export const updateLobbyAnswers = (code: number, answer: Answer): true | Error => {
  const lobby = getLobbyByCode(code)

  if (!lobby) return new Error("Lobby not found")

  if (lobby.answers.map(a => a.playerId).includes(answer.playerId)) return new Error("You already answered")

  lobby.answers.push(answer)

  const payload = {
    answers: lobby.answers,
  }

  sendEvent(lobby.host, 'updateLobbyAnswers', payload)

  return true
}

export const resetLobbyAnswers = (code: number): true | Error => {
  const lobby = getLobbyByCode(code)

  if (!lobby) return new Error("Lobby not found")

  lobby.answers = []

  const payload = {
    answers: [],
  }

  sendEvent(lobby.host, 'updateLobbyAnswers', payload)

  lobby.players.forEach(player => {
    sendEvent(player.client, 'correctAnswerUpdate', { correctAnswer: false })
  })

  return true
}

// reassign player client and update player lobby map
export const reassignPlayer = (oldId: string, newId: string, client: WebSocketClient): true | Error => {
  const lobby = getLobbyByPlayerId(oldId)

  if (!lobby) return new Error("Lobby not found")

  const player = lobby.players.find(p => p.client.id === oldId)

  if (!player) return new Error("Player not found")

  const payload = {
    player: {
      id: player.client.id,
      name: player.name,
      score: player.score,
      streak: player.streak,
    },
    newId: client.id
  }

  sendEvent(lobby.host, 'playerUpdate', payload)

  player.client = client

  getPlayerLobbyMap().delete(oldId)
  getPlayerLobbyMap().set(newId, lobby)

  return true
}

const generateLobbyCode = (): number => { 
  let code = 0

  do {
    code = Math.floor(Math.random() * 900000 + 100000)
  } while (getLobbies().has(code))

  return code
}