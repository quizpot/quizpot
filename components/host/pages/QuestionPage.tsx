"use client"
import React, { useEffect, useState } from 'react'
import { HostLobbyState } from '../../providers/HostLobbyStateProvider'

const QuestionPage = ({ hostLobbyState }: { hostLobbyState: HostLobbyState }) => {
  const backgroundIsImage = hostLobbyState.theme.background.startsWith('data:image/')
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

  let question: string

  if (!hostLobbyState.currentQuestion?.question) {
    question = "Missing question"
  } else {
    question = hostLobbyState.currentQuestion.question
  }

  return (
    <section 
      className='flex flex-col gap-4 justify-between h-screen w-full'
      style={
        backgroundIsImage ? { 
          backgroundImage: `url(${hostLobbyState.theme.background})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        } : { 
          backgroundColor: hostLobbyState.theme.background
        }
      }
    >
      <p className='absolute right-4 top-4 rounded-full p-4 px-6 text-2xl font-semibold text-black bg-white'>{ hostLobbyState.currentQuestionNumber } of { hostLobbyState.totalQuestions }</p>
      <div></div> {/** To center the question */}
      <h1 className='text-center text-4xl font-semibold bg-white text-black p-4 w-full'>{ question }</h1>
      <div className='p-4'>
        <div 
          className='bg-green-500 p-2 rounded-full'
          style={{ width: `${progress}%` }}
        ></div> 
      </div>
    </section>
  )
}

export default QuestionPage