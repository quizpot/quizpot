"use client"
import React from 'react'
import QuizFileInput from '../ui/QuizFileInput'
import { useWebSocket } from '../quiz/WebSocket'
import { useLobby } from './LobbyProvider'
import { useToast } from '../ui/Toaster'

const UploadQuizPrompt = () => {
  const addToast = useToast()
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

      addToast({ message: 'Uploading Quiz & Creating lobby...', type: 'info' })

      ws.send(JSON.stringify({
        type: 'quizUpload',
        hostId: ws.id,
        file: JSON.stringify(content)
      }))

      ws.onmessage = (event) => {
        const content = JSON.parse(event.data)

        addToast({ message: 'Received answer!', type: 'info' })

        if (content.type === 'lobbyCreated') {
          console.log("[UploadQuizPrompt] Received quiz upload response from server:", content.hostId)
          lobby.setCode(content.code)
          addToast({ message: 'Lobby created with code: ' + content.code, type: 'success' })
        }

        if (content.type === 'quizUploadError') {
          addToast({ message: 'Error uploading quiz: ' + content.error, type: 'error' })
        }
      }
    }} />
  )
}

export default UploadQuizPrompt