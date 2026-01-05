"use client"
import React, { useEffect, useState } from 'react'
import { HostLobbyState } from '../../providers/HostLobbyStateProvider'
import { getBackgroundStyles } from '@/lib/client/BackgroundStyles'
import InvalidPage from './InvalidPage'
import FancyCard from '@/components/ui/fancy-card'
import HostStatusBar from '../ui/HostStatusBar'

const QuestionPage = ({ hostLobbyState }: { hostLobbyState: HostLobbyState }) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!hostLobbyState.timeout) {
      setProgress(0)
      return
    }

    const endTime = Date.now() + hostLobbyState.timeout
    const startTime = Date.now()
    const totalDuration = endTime - startTime
    
    const interval = setInterval(() => {
      const timeElapsed = Date.now() - startTime
      const newProgress = Math.min((timeElapsed / totalDuration) * 100, 100)
      
      setProgress(newProgress)

      if (newProgress >= 100) {
        clearInterval(interval)
      }
    }, 15)

    return () => clearInterval(interval)
  }, [hostLobbyState.timeout])

  if (hostLobbyState.currentQuestion?.questionType === 'slide') 
    return <InvalidPage hostLobbyState={ hostLobbyState } message='Invalid question type for question page.' />

  let question: string

  if (!hostLobbyState.currentQuestion?.question) {
    question = "Missing question"
  } else {
    question = hostLobbyState.currentQuestion.question
  }

  return (
    <section 
      className='flex flex-col gap-4 justify-between h-screen w-full'
      style={ getBackgroundStyles(hostLobbyState.theme.background) }
    >
      <FancyCard color='white' className='absolute right-4 top-4 rounded-full p-4 px-6 text-2xl font-semibold'>{ hostLobbyState.currentQuestionNumber } of { hostLobbyState.totalQuestions }</FancyCard>
      <div></div> {/** To center the question */}
      <FancyCard color='white' className='text-center text-4xl font-semibold py-4 px-4 mx-auto'>{ question }</FancyCard>
      <div className='p-4'>
        <div 
          className='bg-green-500 p-2 rounded-full'
          style={{ width: `${progress}%` }}
        ></div> 
      </div>
      <HostStatusBar />
    </section>
  )
}

export default QuestionPage