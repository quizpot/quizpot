"use client"
import { QuizResult } from "@quizpot/quizcore"
import { createContext, useContext } from "react"

const ResultContext = createContext<{
  result: QuizResult
} | null>(null)

export const ResultProvider = ({ children, result }: { children: React.ReactNode, result: QuizResult }) => {

  return (
    <ResultContext.Provider value={{ result }}>
      { children }
    </ResultContext.Provider>
  )
}

export const useResult = () => {
  const context = useContext(ResultContext)

  if (!context) {
    throw new Error("No result context found")
  }

  return context
}