"use client"
import React, { useEffect } from 'react'
import QuizFileInput from '../ui/QuizFileInput'
import { useWebSocket } from '../providers/WebSocketProvider'
import { useToast } from '../ui/Toaster'
import { useHostLobbyState } from '../providers/HostLobbyStateProvider'

const UploadQuizPrompt = () => {
  const addToast = useToast()
  const { clientId, sendEvent, onEvent, isConnected } = useWebSocket()
  const setHostLobbyState = useHostLobbyState().setHostLobbyState

  useEffect(() => {
    if (!isConnected) return
    
    const unsubscribeLobbyCreated = onEvent('lobbyCreated', (ctx) => {
      console.log(ctx)
      console.log("[UploadQuizPrompt] Received lobby from server:", ctx.lobby.code)
      setHostLobbyState(ctx.lobby)
      addToast({ message: 'Lobby created with code: ' + ctx.lobby.code, type: 'success' })
    })

    // TODO: Rename event to createLobbyError
    const unsubscribeUploadError = onEvent('quizUploadError', (ctx) => {
      addToast({ message: 'Error uploading quiz: ' + ctx.error, type: 'error' })
    })

    return () => {
      unsubscribeLobbyCreated()
      unsubscribeUploadError()
    }
  }, [isConnected, onEvent, addToast, setHostLobbyState])

  if (!isConnected) {
    return <QuizFileInput disabled={true} />
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null || e.target.files.length === 0) return

    const file = e.target.files[0]
    const content = await file.text()

    addToast({ message: 'Creating lobby...', type: 'info' })

    // TODO: Rename event to createLobby
    sendEvent('quizUpload', {
      hostId: clientId,
      file: content,
    })
  }

  return (
    <QuizFileInput onChange={ handleFileUpload } />
  )
}

export default UploadQuizPrompt