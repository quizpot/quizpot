"use client"
import { useHostLobbyState } from '@/components/providers/HostLobbyStateProvider'
import { useWebSocket } from '@/components/providers/WebSocketProvider'
import BooleanInput from '@/components/ui/BooleanInput'
import Button from '@/components/ui/Button'
import QuizFileInput from '@/components/ui/QuizFileInput'
import { useToast } from '@/components/ui/Toaster'
import { QuizFile } from '@/lib/misc/QuizFile'
import React, { useEffect, useState } from 'react'

const HostQuizPage = () => {
  const [customNames, setCustomNames] = useState(true)
  const [questionsOnDevice, setQuestionsOnDevice] = useState(false)
  const [quiz, setQuiz] = useState<QuizFile | null>(null)

  const addToast = useToast()
  const { sendEvent, clientId, isConnected, onEvent } = useWebSocket()
  const setHostLobbyState = useHostLobbyState().setHostLobbyState

  useEffect(() => {
    if (!isConnected) return

    const unsubscribeLobbyCreated = onEvent('lobbyCreated', (ctx) => {
      setHostLobbyState(ctx.lobbyState)
    })

    const unsubscribeCreateLobbyError = onEvent('createLobbyError', (ctx) => {
      addToast({ message: 'Error creating lobby: ' + ctx.message, type: 'error' })
    })

    return () => {
      unsubscribeCreateLobbyError()
      unsubscribeLobbyCreated()
    }
  }, [isConnected, addToast, onEvent, setHostLobbyState])

  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null || e.target.files.length === 0) {
      addToast({ message: 'No file selected', type: 'error' })
      return
    }

    const file = e.target.files[0]
    const fileText = await file.text()

    try {
      const jsonObj = JSON.parse(fileText)
      setQuiz(jsonObj)
    } catch (e) {
      addToast({ message: 'Error parsing quiz file, ' + e, type: 'error' })
    }
  }

  const onHost = () => {
    addToast({ message: 'Creating lobby...', type: 'info' })

    if (clientId === null) {
      addToast({ message: 'Error creating lobby: Client ID not found', type: 'error' })
      return
    }

    if (quiz === null) {
      addToast({ message: 'Error creating lobby: Quiz not found', type: 'error' })
      return
    }

    sendEvent("createLobby", {
      hostId: clientId,
      settings: {
        customNames,
        questionsOnDevice,
      },
      file: quiz,
    })
  }

  return (
    <section className='min-h-screen w-full flex flex-col items-center justify-center'>
      <div className='flex flex-col items-center justify-center gap-4 p-4 max-w-md w-full'>
        <h1 className='text-4xl font-semibold w-full text-center'>Host Quiz</h1>
        <div className='p-4 max-w-md w-full flex flex-col gap-4'>
          <div className='flex px-4 justify-between'>
            <p>Custom names:</p>
            <BooleanInput onChange={ (v) => { setCustomNames(v) } } value={ customNames } />
          </div>
          <div className='flex px-4 justify-between'>
            <p>Questions on device:</p>
            <BooleanInput onChange={ (v) => { setQuestionsOnDevice(v) } } value={ questionsOnDevice } />
          </div>
        </div>
        <QuizFileInput onChange={ onFile } />
        <Button onClick={ onHost } variant='green' className='w-full'>
          Host
        </Button>
      </div>
    </section>
  )
}

export default HostQuizPage