"use client"
import { Quiz } from "@quizpot/quizcore"
import { createContext, useContext, useEffect, useRef, useState } from "react"

const EditorQuizContext = createContext<{
  quiz: Quiz
  setQuiz: (quiz: Quiz) => void
  saved: boolean
  setSaved: (saved: boolean) => void
} | null>(null)

export const EditorQuizProvider = ({ children, quiz }: { children: React.ReactNode, quiz: Quiz }) => {
  const [q, setQuiz] = useState<Quiz>(quiz)
  const [saved, setSaved] = useState(!!quiz.id)
  const isInitialMount = useRef(true)

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }

    setSaved(false)

    if (!q.id) {
      return
    }

    const timeout = setTimeout(async () => {
      try {
        const response = await fetch('/api/editor/quiz/update', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(q),
        })

        if (response.ok) {
          setSaved(true)
        }
      } catch (error) {
        console.error("Auto-save failed:", error)
      }
    }, 5000)

    return () => clearTimeout(timeout)
  }, [q])

  return (
    <EditorQuizContext.Provider value={{ quiz: q, setQuiz, saved, setSaved }}>
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