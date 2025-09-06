"use client"
import { createContext, useContext, useState } from "react"

const EditorCurrentQuestionContext = createContext<{
  currentQuestionIndex: number
  setCurrentQuestionIndex: (questionIndex: number) => void
} | null>(null)

export const EditorCurrentQuestionProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0)

  return (
    <EditorCurrentQuestionContext.Provider value={{ currentQuestionIndex, setCurrentQuestionIndex }}>
      { children }
    </EditorCurrentQuestionContext.Provider>
  )
}

export const useEditorCurrentQuestion = () => {
  const context = useContext(EditorCurrentQuestionContext)

  if (!context) {
    throw new Error("No current question index context found")
  }

  return context
}