"use client"
import { useEffect, useState } from 'react'
import InvalidPage from './InvalidPage'
import FancyCard from '@/components/ui/fancy-card'
import HostStatusLayout from '../layouts/HostStatusLayout'
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
    <HostStatusLayout>
      <section className='flex flex-col gap-4 justify-between h-full w-full'>
        <FancyCard className='absolute right-4 top-4 rounded-full p-4 px-6 text-2xl font-semibold'>{ hostLobbyState.stepNumber } of { hostLobbyState.quizInfo.stepCount }</FancyCard>
        <div></div> {/** To center the question */}
        <div className='p-4'>
          <FancyCard className='text-center text-4xl font-semibold py-4 px-4 mx-auto'>{ hostLobbyState.currentStep?.data.question }</FancyCard>
        </div>
        <div className='p-4'>
          <div 
            className='bg-green-500 p-2 rounded-full'
            style={{ width: `${progress}%` }}
          ></div> 
        </div>
      </section>
    </HostStatusLayout>
  )
}

export default QuestionPage