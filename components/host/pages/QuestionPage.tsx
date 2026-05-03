"use client"
import { useEffect, useState } from 'react'
import InvalidPage from './InvalidPage'
import FancyCard from '@/components/ui/fancy-card'
import { HostLobbyState } from '@quizpot/quizcore'

const QuestionPage = ({ hostLobbyState }: { hostLobbyState: HostLobbyState }) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!hostLobbyState.timeout || hostLobbyState.currentStep?.type !== 'question') {
      setProgress(0)
      return
    }

    const startTime = new Date(hostLobbyState.timeout).getTime()
    const totalDuration = hostLobbyState.currentStep.data.displayTime * 1000
    const endTime = startTime + totalDuration

    if (Date.now() >= endTime) {
      setProgress(100)
      return
    }

    setProgress(0)

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const newProgress = Math.min((elapsed / totalDuration) * 100, 100)
      setProgress(newProgress)
      if (newProgress >= 100) clearInterval(interval)
    }, 15)

    return () => clearInterval(interval)
  }, [hostLobbyState.timeout])

  if (hostLobbyState.currentStep?.type === 'slide') 
    return <InvalidPage hostLobbyState={ hostLobbyState } message='Invalid question type for question page.' />

  return (
    <section className='flex flex-col gap-4 justify-between h-full w-full'>
      <div></div> {/** To center the question */}
      <div className='p-4'>
        <FancyCard className='text-center text-4xl font-semibold py-4 px-4 mx-auto'>{ hostLobbyState.currentStep?.data.question }</FancyCard>
      </div>
      <div className='p-4'>
        <FancyCard color='green' 
          className='rounded-full'
          style={{ width: `${progress}%` }}
        ></FancyCard> 
      </div>
    </section>
  )
}

export default QuestionPage