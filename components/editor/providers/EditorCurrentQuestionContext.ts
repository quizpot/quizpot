import { createContext } from "react"

export const EditorCurrentQuestionContext = createContext<{
  currentQuestionIndex: number
  setCurrentQuestionIndex: (questionIndex: number) => void
} | null>(null)