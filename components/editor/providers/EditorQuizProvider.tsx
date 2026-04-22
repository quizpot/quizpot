"use client"
import { Quiz } from "@quizpot/quizcore"
import { createContext, useContext, useState } from "react"

const EditorQuizContext = createContext<{
  quiz: Quiz
  setQuiz: (quiz: Quiz) => void
} | null>(null)

export const EditorQuizProvider = ({ children, quiz }: { children: React.ReactNode, quiz: Quiz }) => {
  const [q, setQuiz] = useState<Quiz>(quiz)

  return (
    <EditorQuizContext.Provider value={{ quiz: q, setQuiz }}>
      { children }
    </EditorQuizContext.Provider>
  )
}

export const useEditorQuiz = () => {
  const context = useContext(EditorQuizContext)

  if (!context) {
    throw new Error("No quiz file context found")
  }

  return context
}