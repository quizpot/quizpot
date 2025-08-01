"use client"
import React, { useEffect } from 'react'
import QuizFileInput from '../ui/QuizFileInput'
import { useWebSocket } from '../ws/WebSocket'
import { useLobby } from './LobbyProvider'
import { useToast } from '../ui/Toaster'

const UploadQuizPrompt = () => {
  const addToast = useToast()
  const { clientId, sendEvent, onEvent, isConnected } = useWebSocket()
  const lobby = useLobby()

  useEffect(() => {
    if (!isConnected) return
    
    // Register the handler for 'lobbyCreated'
    const unsubscribeLobbyCreated = onEvent('lobbyCreated', (ctx) => {
      console.log("[UploadQuizPrompt] Received quiz upload response from server:", ctx.hostId)
      lobby.setCode(ctx.code)
      addToast({ message: 'Lobby created with code: ' + ctx.code, type: 'success' })
    })

    // Register the handler for 'quizUploadError'
    const unsubscribeUploadError = onEvent('quizUploadError', (ctx) => {
      addToast({ message: 'Error uploading quiz: ' + ctx.error, type: 'error' })
    })

    // Cleanup function to remove handlers on unmount
    return () => {
      unsubscribeLobbyCreated()
      unsubscribeUploadError()
    }
  }, [isConnected, onEvent, addToast, lobby])

  if (!isConnected) {
    return <p>Connecting to server...</p>;
  }

  // @ts-expect-error - any type
  const handleFileUpload = async (e) => {
    if (e.target.files === null || e.target.files.length === 0) return

    const file = e.target.files[0]
    const content = await file.text()

    addToast({ message: 'Creating lobby...', type: 'info' })

    // Use the new sendEvent helper
    sendEvent('quizUpload', {
      hostId: clientId,
      file: content, // You should probably send the content directly, not stringify it twice
    })
  }

  return (
    <QuizFileInput onChange={ handleFileUpload } />
  )
}

export default UploadQuizPrompt