export interface ServerEvents {
  'createLobbyError': CreateLobbyErrorPayload
}

interface CreateLobbyErrorPayload {
  message: string
}