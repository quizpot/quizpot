"use client"
import { defaultQuiz } from "@/lib/misc/DefaultQuiz"
import { QuizFile } from "@/lib/misc/QuizFile"
import { createContext, useContext, useState } from "react"

const EditorQuizFileContext = createContext<{
  quizFile: QuizFile
  setQuizFile: (quizFile: QuizFile) => void
} | null>(null)

export const EditorQuizFileProvider = ({ children }: { children: React.ReactNode }) => {
  const [quizFile, setQuizFile] = useState<QuizFile>(defaultQuiz)

  return (
    <EditorQuizFileContext.Provider value={{ quizFile, setQuizFile }}>
      { children }
    </EditorQuizFileContext.Provider>
  )
}

export const useEditorQuizFile = () => {
  const context = useContext(EditorQuizFileContext)

  if (!context) {
    throw new Error("No quiz file context found")
  }

  return context
}