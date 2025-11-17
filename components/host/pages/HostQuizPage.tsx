"use client"
import { useHostLobbyState } from '@/components/providers/HostLobbyStateProvider'
import { useWebSocket } from '@/components/providers/WebSocketProvider'
import BooleanInput from '@/components/ui/BooleanInput'
import Button from '@/components/ui/ButtonOld'
import { useToast } from '@/components/ui/toaster'
import { QuizFile } from '@/lib/QuizFile'
import React, { useEffect, useState } from 'react'
import SetQuizDialog from '../ui/SetQuizDialog'
import Header from '@/components/nav/Header'

const HostQuizPage = () => {
  const [customNames, setCustomNames] = useState(true)
  const [questionsOnDevice, setQuestionsOnDevice] = useState(false)
  const [quiz, setQuiz] = useState<QuizFile | null>(null)

  const toast = useToast() 
  const { sendEvent, clientId, isConnected, onEvent } = useWebSocket()
  const setHostLobbyState = useHostLobbyState().setHostLobbyState

  useEffect(() => {
    if (!isConnected) return

    const unsubscribeLobbyCreated = onEvent('lobbyCreated', (ctx) => {
      setHostLobbyState(ctx.lobbyState)
    })

    const unsubscribeCreateLobbyError = onEvent('createLobbyError', (ctx) => {
      toast('Error creating lobby: ' + ctx.message, { variant: 'error' })
    })

    return () => {
      unsubscribeCreateLobbyError()
      unsubscribeLobbyCreated()
    }
  }, [isConnected, toast, onEvent, setHostLobbyState])

  const onHost = () => {
    document.documentElement.requestFullscreen()
    
    toast('Creating lobby...', { variant: 'info' })

    if (clientId === null) {
      toast('Error creating lobby: Client ID not found', { variant: 'error' })
      return
    }

    if (quiz === null) {
      toast('Error creating lobby: Quiz not found', { variant: 'error' })
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
    <>
      <Header />
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
          <div className='w-full flex flex-col gap-4 px-4'>
            <div className='flex gap-4 items-center justify-center'>
              <SetQuizDialog quizName={ quiz ? quiz.title : undefined } setQuiz={ setQuiz } />
            </div>
            <Button onClick={ onHost } variant='green' className='w-full font-semibold'>
              Host
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}

export default HostQuizPage