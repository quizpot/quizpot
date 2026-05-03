"use client"
import FancyCard from '@/components/ui/fancy-card'
import { PlayerLobbyState } from '@quizpot/quizcore'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

const QuestionPage = ({ playerLobbyState }: { playerLobbyState: PlayerLobbyState }) => {
  const t = useTranslations('QuestionPage')
  const question = playerLobbyState.currentStep
  const [progress, setProgress] = useState(0)
  
  useEffect(() => {
    if (!playerLobbyState.timeout || playerLobbyState.currentStep?.type !== 'question') {
      setProgress(0)
      return
    }

    const startTime = new Date(playerLobbyState.timeout).getTime()
    const totalDuration = playerLobbyState.currentStep.data.displayTime * 1000
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
  }, [playerLobbyState.timeout])

  if (!question || question.type !== 'question') return <></>

  return (
    <section className='flex flex-col gap-4 justify-between h-full w-full'>
      <div></div> {/** To center the question */}
      <div className='p-4'>
        {
          playerLobbyState.lobbySettings.displayOnDevice ? (
            <FancyCard className='text-center text-4xl font-semibold py-4 px-4 mx-auto'>{ question.data.question }</FancyCard>
          ) : (
            <FancyCard className='text-center text-4xl font-semibold py-4 px-4 mx-auto'>{ t('title') }</FancyCard>
          )
        }
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