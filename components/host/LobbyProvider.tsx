"use client"
import { Lobby } from '@/lib/managers/LobbyManager'
import React, { createContext } from 'react'

const LobbyContext = createContext<{
  lobby: Lobby | null
  setLobby: (lobby: Lobby | null) => void
} | null>(null)

export const LobbyProvider = ({ children }: { children: React.ReactNode }) => {
  const [lobby, setLobby] = React.useState<Lobby | null>(null)

  return (
    <LobbyContext.Provider value={{ lobby, setLobby }}>
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