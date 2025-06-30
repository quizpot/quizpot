import { QuizFile } from "./QuizFile"

export const lobbies: Lobby[] = []

export interface Lobby {
  id: number
  hostId: string
  quiz: QuizFile
}