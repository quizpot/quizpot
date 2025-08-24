import { QuizFile } from "../misc/QuizFile"
import { LobbySettings } from "../server/managers/LobbyManager"
import { ClientAnswer } from "./ClientAnswer"

export interface ClientEvents {
  'createLobby': CreateLobbyPayload
  'joinLobby': JoinLobbyPayload
  'playerKick': PlayerKickPayload
  'startLobby': StartLobbyPayload
  'submitAnswer': SubmitAnswerPayload
}

interface CreateLobbyPayload {
  hostId: string
  settings: LobbySettings
  file: QuizFile
}

interface JoinLobbyPayload {
  code: number
  name?: string
}

interface PlayerKickPayload {
  playerId: string
}

interface StartLobbyPayload {
  start: boolean
}

interface SubmitAnswerPayload {
  answer: ClientAnswer
}