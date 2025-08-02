import { QuizFile } from "@/lib/QuizFile"
import { createContext } from "react"

export const EditorQuizFileContext = createContext<{
  quizFile: QuizFile
  setQuizFile: (quizFile: QuizFile) => void
} | null>(null)