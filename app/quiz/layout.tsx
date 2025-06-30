import { WebSocketProvider } from '@/components/quiz/WebSocket'
import React from 'react'

const QuizLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <WebSocketProvider wsUrl='ws://localhost:3000/api/ws'>
      { children }
    </WebSocketProvider>
  )
}

export default QuizLayout