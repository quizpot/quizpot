"use client"
import React, { createContext } from 'react'

const LobbyContext = createContext<{
  code: number | null
  setCode: (code: number | null) => void
} | null>(null)

export const LobbyProvider = ({ children }: { children: React.ReactNode }) => {
  const [code, setCode] = React.useState<number | null>(null)

  return (
    <LobbyContext.Provider value={{ code, setCode }}>
      { children }
    </LobbyContext.Provider>
  )
}

export const useLobby = () => {
  const context = React.useContext(LobbyContext)
  
  if (context === null) {
    throw new Error("useLobby must be used within a LobbyProvider")
  }

  return context
}