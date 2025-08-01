import { LobbyProvider } from '@/components/host/LobbyProvider'
import { WebSocketProvider } from '@/components/ws/WebSocket'
import React from 'react'

const QuizLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <WebSocketProvider wsUrl='ws://localhost:3000/api/ws'>
      <LobbyProvider>
        { children }
      </LobbyProvider>
    </WebSocketProvider>
  )
}

export default QuizLayout