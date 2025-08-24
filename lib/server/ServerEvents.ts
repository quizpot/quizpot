import { HostLobbyState } from "@/components/providers/HostLobbyStateProvider"
import { PlayerState } from "../misc/PlayerState"
import { LobbyStatus } from "../misc/LobbyStatus"
import { SanitizedQuestion } from "../misc/QuestionSanitizer"
import { Answer } from "./managers/LobbyManager"
import { PlayerLobbyState } from "@/components/providers/PlayerLobbyStateProvider"

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
  'lobbyDeleted': EmptyPayload
  'startLobbyError': ErrorPayload
  'lobbyJoined': LobbyJoinedPayload
  'lobbyJoinError': ErrorPayload
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface EmptyPayload {}

interface SetIdPayload {
  id: string
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
  player: PlayerState
}

type LobbyStatusUpdatePayload = OtherStatusUpdatePayload | QuestionStatusUpdatePayload

interface QuestionStatusUpdatePayload {
  status: LobbyStatus.question
  sanitizedQuestion: SanitizedQuestion
}

interface OtherStatusUpdatePayload {
  status: Exclude<LobbyStatus, LobbyStatus.question>
}

interface UpdateLobbyAnswersPayload {
  answers: Answer[]
}

interface LobbyJoinedPayload {
  lobby: PlayerLobbyState
}