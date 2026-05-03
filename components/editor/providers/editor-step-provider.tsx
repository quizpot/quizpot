"use client"
import { createContext, useContext, ReactNode } from "react"
import { useEditorCurrentStep } from "./editor-current-step-provider"
import { useEditorQuiz } from "./editor-quiz-provider"

interface EditorStepContextValue<T = any> {
  data: T
  setData: (data: T) => void
}

const EditorStepContext = createContext<EditorStepContextValue | null>(null)

export const EditorStepProvider = ({ children }: { children: ReactNode }) => {
  const { currentStep } = useEditorCurrentStep()
  const { quiz, setQuiz } = useEditorQuiz()

  if (currentStep === null) {
    return <>{ children }</>
  }

  const step = quiz.steps[currentStep]

  const setData = (newData: any) => {
    setQuiz({
      ...quiz,
      steps: quiz.steps.map((s, i) => 
        i === currentStep ? { ...s, data: newData } : s
      )
    })
  }

  return (
    <EditorStepContext.Provider value={{ data: step.data, setData }}>
      { children }
    </EditorStepContext.Provider>
  )
}

export function useEditorStep<T>() {
  const context = useContext(EditorStepContext)
  
  if (!context) {
    throw new Error("useEditorStep must be used within an EditorStepProvider")
  }

  return context as EditorStepContextValue<T>
}