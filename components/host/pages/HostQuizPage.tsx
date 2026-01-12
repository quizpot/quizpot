"use client"
import { useHostLobbyState } from '@/components/providers/HostLobbyStateProvider'
import { useWebSocket } from '@/components/providers/WebSocketProvider'
import BooleanInput from '@/components/ui/BooleanInput'
import { useToast } from '@/components/ui/toaster'
import { QuizFile } from '@/lib/QuizFile'
import { useState } from 'react'
import SetQuizDialog from '../ui/SetQuizDialog'
import Header from '@/components/nav/Header'
import FancyButton from '@/components/ui/fancy-button'
import { useTranslations } from 'next-intl'
import FancyCard from '@/components/ui/fancy-card'
import { LobbyStatus } from '@/lib/misc/LobbyStatus'
import { LobbySettings } from '@/lib/server/managers/LobbyManager'

const HostQuizPage = () => {
  const t = useTranslations('HostPage')
  const btn = useTranslations('Buttons')

  const toast = useToast() 

  const { clientId } = useWebSocket()
  const setHostLobbyState = useHostLobbyState().setHostLobbyState

  const [customNames, setCustomNames] = useState(true)
  const [statusBar, setStatusBar] = useState(true)
  const [questionsOnDevice, setQuestionsOnDevice] = useState(false)

  const [quiz, setQuiz] = useState<QuizFile | null>(null)

  const onHost = () => {
    document.documentElement.requestFullscreen()
    
    toast('Creating lobby...', { variant: 'info' })

    if (clientId === null) {
      toast('Error creating lobby: Can\'t connect to server...', { variant: 'error' })
      return
    }

    if (quiz === null) {
      toast('Error creating lobby: Quiz not found', { variant: 'error' })
      return
    }

    const settings: LobbySettings = {
      customNames,
      questionsOnDevice,
    } 

    fetch('/api/create/lobby', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        clientId,
        quizFile: JSON.stringify(quiz),
        settings
      }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          toast(data.error, { variant: 'error' })
          return
        }
        
        setHostLobbyState({
          code: data.code,
          status: LobbyStatus.waiting,
          currentQuestionNumber: 0,
          totalQuestions: data.totalQuestions,
          theme: data.theme,
          lobbySettings: settings,
          players: [],
          answers: [],
        })
      })
  }

  return (
    <>
      <Header />
      <section className='min-h-screen w-full flex flex-col items-center justify-center'>
        <div className='flex flex-col items-center justify-center gap-4 p-4 max-w-md w-full'>
          <h1 className='text-4xl font-semibold w-full text-center'>{ t('title') }</h1>
          <FancyCard className='p-4 max-w-md w-full flex flex-col gap-4'>
            <h1 className='text-2xl text-center'>{ t('settings') }</h1>
            <BooleanInput className='w-full' onChange={ (v) => { setCustomNames(v) } } value={ customNames }>
              { t('customNames') }
            </BooleanInput>
            <BooleanInput onChange={ (v) => { setStatusBar(v) } } value={ statusBar }>
              { t('statusBar') }
            </BooleanInput>
            <BooleanInput onChange={ (v) => { setQuestionsOnDevice(v) } } value={ questionsOnDevice }>
              { t('questionsOnDevice') }
            </BooleanInput>
          </FancyCard>
          <div className='w-full flex flex-col gap-4'>
            <div className='flex gap-4 items-center justify-center'>
              <SetQuizDialog quizName={ quiz ? quiz.title : undefined } setQuiz={ setQuiz } />
            </div>
            <FancyButton onClick={ onHost } color='green' className='w-full'>
              { btn('host') }
            </FancyButton>
          </div>
        </div>
      </section>
    </>
  )
}

export default HostQuizPage