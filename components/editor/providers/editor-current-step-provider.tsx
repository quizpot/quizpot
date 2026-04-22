"use client"
import { createContext, useContext, useState } from "react"

const EditorCurrentStepContext = createContext<{
  currentStep: number | null
  setCurrentStep: (step: number | null) => void
} | null>(null)

export const EditorCurrentStepProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentStep, setCurrentStep] = useState<number | null>(null)

  return (
    <EditorCurrentStepContext.Provider value={{ currentStep: currentStep, setCurrentStep: setCurrentStep }}>
      { children }
    </EditorCurrentStepContext.Provider>
  )
}

export const useEditorCurrentStep = () => {
  const context = useContext(EditorCurrentStepContext)

  if (!context) {
    throw new Error("No current step context found")
  }

  return context
}