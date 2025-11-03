import { HostLobbyState } from "@/components/providers/HostLobbyStateProvider"
import { PlayerState } from "../misc/PlayerState"
import { LobbyStatus } from "../misc/LobbyStatus"
import { SanitizedQuestion } from "./QuestionSanitizer"
import { Answer } from "./managers/LobbyManager"
import { PlayerLobbyState } from "@/components/providers/PlayerLobbyStateProvider"
import { Question, SlideQuestion } from "../misc/QuizFile"

/**
 * Events that the server can emit to the client.
 */
export interface ServerEvents {
  'setId': SetIdPayload
  'lobbyCreated': LobbyCreatedPayload
  'createLobbyError': ErrorPayload
  'playerJoined': PlayerJoinedPayload
  'playerLeft': PlayerLeftPayload
  'playerUpdate': PlayerUpdatePayload
  'lobbyStatusUpdate': LobbyStatusUpdatePayload
  'updateLobbyAnswers': UpdateLobbyAnswersPayload
  'lobbyStartedError': ErrorPayload
  'playerKicked': EmptyPayload
  'lobbyDeleted': LobbyDeletedPayload
  'startLobbyError': ErrorPayload
  'lobbyJoined': LobbyJoinedPayload
  'lobbyJoinError': ErrorPayload
  'submitAnswerError': ErrorPayload
  'playerScoreUpdate': PlayerScoreUpdatePayload
  'correctAnswerUpdate': CorrectAnswerUpdatePayload
  'nextQuestionError': ErrorPayload
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface EmptyPayload {}

interface SetIdPayload {
  id: string
}

interface LobbyDeletedPayload {
  reason: string
}

interface LobbyCreatedPayload {
  lobbyState: HostLobbyState
}

interface ErrorPayload {
  message: string
}

interface PlayerJoinedPayload {
  player: PlayerState
}

interface PlayerLeftPayload {
  player: PlayerState
}

interface PlayerUpdatePayload {
  player: PlayerState,
  newId?: string
}

export type LobbyStatusUpdatePayload = OtherStatusUpdatePayload | QuestionStatusUpdatePayload | SlideStatusUpdatePayload

interface SlideStatusUpdatePayload {
  status: LobbyStatus.slide
  currentQuestion?: SlideQuestion
  totalQuestions?: number
}

interface QuestionStatusUpdatePayload {
  status: LobbyStatus.question
  currentQuestion?: Question
  sanitizedQuestion: SanitizedQuestion
  totalQuestions?: number
  timeout?: number
}

interface OtherStatusUpdatePayload {
  status: Exclude<Exclude<LobbyStatus, LobbyStatus.question>, LobbyStatus.slide>
  timeout?: number
}

interface UpdateLobbyAnswersPayload {
  answers: Answer[]
}

interface LobbyJoinedPayload {
  lobby: PlayerLobbyState
}

interface PlayerScoreUpdatePayload {
  player: PlayerState
}

interface CorrectAnswerUpdatePayload {
  correctAnswer: boolean
}