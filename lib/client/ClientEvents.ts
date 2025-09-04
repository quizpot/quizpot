import { QuizFile } from "../misc/QuizFile"
import { LobbySettings } from "../server/managers/LobbyManager"
import { ClientAnswer } from "./ClientAnswer"

/**
 * Events that the client can emit to the server.
 */
export interface ClientEvents {
  'createLobby': CreateLobbyPayload
  'joinLobby': JoinLobbyPayload
  'playerKick': PlayerKickPayload
  'startLobby': EmptyPayload
  'submitAnswer': SubmitAnswerPayload
  'nextQuestion': EmptyPayload
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface EmptyPayload {}

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

interface SubmitAnswerPayload {
  answer: ClientAnswer
}