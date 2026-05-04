"use client"
import { createContext, useContext, useState } from "react"

const ResultCurrentStepContext = createContext<{
  currentStep: number | null
  setCurrentStep: (step: number | null) => void
} | null>(null)

export const ResultCurrentStepProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentStep, setCurrentStep] = useState<number | null>(null)

  return (
    <ResultCurrentStepContext.Provider value={{ currentStep: currentStep, setCurrentStep: setCurrentStep }}>
      { children }
    </ResultCurrentStepContext.Provider>
  )
}

export const useResultCurrentStep = () => {
  const context = useContext(ResultCurrentStepContext)

  if (!context) {
    throw new Error("No current step context found")
  }

  return context
}