import { QuizFile } from "@/lib/misc/QuizFile"
import { createContext } from "react"

export const EditorQuizFileContext = createContext<{
  quizFile: QuizFile
  setQuizFile: (quizFile: QuizFile) => void
} | null>(null)