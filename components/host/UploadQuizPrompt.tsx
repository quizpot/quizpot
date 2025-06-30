"use client"
import React from 'react'
import QuizFileInput from '../ui/QuizFileInput'
import { useWebSocket } from '../quiz/WebSocket'
import { useLobby } from './LobbyProvider'

const UploadQuizPrompt = () => {
  const { ws } = useWebSocket()
  const lobby = useLobby()

  if (!ws) {
    return <></>
  }

  return (
    <QuizFileInput onChange={async (e) => {
      if (e.target.files === null || e.target.files.length === 0) return

      const file = e.target.files[0]
      const content = await file.text()

      ws.send(JSON.stringify({
        type: 'quizUpload',
        hostId: ws.id,
        file: JSON.stringify(content)
      }))

      ws.onmessage = (event) => {
        const content = JSON.parse(event.data)

        console.log('listening quiz file input')

        if (content.type === 'lobbyCreated') {
          console.log("[UploadQuizPrompt] Received quiz upload response from server:", content.hostId)
          lobby.setCode(content.code)
        }
      }
    }} />
  )
}

export default UploadQuizPrompt