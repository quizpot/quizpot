"use client"
import { QuizStep } from '@quizpot/quizcore'
import FancyCard from '@/components/ui/fancy-card'
import { useResultCurrentStep } from '../providers/result-current-step-provider'
import StepIcon from '@/components/ui/step-icon'

const StepNavigatorCard = ({ step, index }: { step?: QuizStep, index: number | null }) => {
  const { setCurrentStep, currentStep } = useResultCurrentStep()

  const isLeaderboard = index === null
  const label = step 
    ? (step.type === 'question' ? step.data.question : step.data.title) 
    : 'Leaderboard'

  return (
    <FancyCard
      onClick={() => setCurrentStep(index)}
      color={index === currentStep ? 'foreground' : 'background'}
      className='w-full relative aspect-video flex justify-center items-center overflow-hidden mr-2 md:mr-0'
    >
      <span className='absolute top-2 left-0 w-full px-2 truncate text-center'>
        {label}
      </span>
      
      <StepIcon step={step ?? 'leaderboard'} size={24} />

      {!isLeaderboard && (
        <span className='absolute bottom-2 right-2 text-sm opacity-50'>
          {index + 1}
        </span>
      )}
    </FancyCard>
  )
}

export default StepNavigatorCard