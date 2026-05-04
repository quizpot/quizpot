import { QuizStep } from '@quizpot/quizcore'
import { Copy, Trash } from 'lucide-react'
import FancyCard from '@/components/ui/fancy-card'
import { useEditorCurrentStep } from '../providers/editor-current-step-provider'
import FancyButton from '@/components/ui/fancy-button'
import { useEditorQuiz } from '../providers/editor-quiz-provider'
import StepIcon from '@/components/ui/step-icon'

const StepNavigatorCard = ({ step, index }: { step: QuizStep, index: number }) => {
  const { quiz, setQuiz } = useEditorQuiz()
  const { setCurrentStep, currentStep } = useEditorCurrentStep()

  const copyStep = () => {
    const updatedSteps = [...quiz.steps]
    const stepToCopy = { ...updatedSteps[index] }
    updatedSteps.splice(index + 1, 0, stepToCopy)
    setQuiz({ ...quiz, steps: updatedSteps })
  }

  const deleteStep = () => {
    if (quiz.steps.length === 1) setCurrentStep(null)
    if (currentStep === index) setCurrentStep(index - 1)
    const updatedSteps = quiz.steps.filter((_, i) => i !== index)
    setQuiz({ ...quiz, steps: updatedSteps })
  }

  return (
    <div className='flex gap-2 w-full min-w-[200px] md:min-w-0 shrink-0 group'>
      <div className='flex flex-col items-center justify-center gap-2'>
        <FancyButton size='sm' color='background' onClick={copyStep}>
          <Copy />
        </FancyButton>
        <FancyButton size='sm' color='background' onClick={deleteStep}>
          <Trash />
        </FancyButton>
      </div>
      <FancyCard
        onClick={() => setCurrentStep(index)}
        color={index === currentStep ? 'foreground' : 'background'}
        className='flex-1 w-full relative aspect-video flex justify-center items-center overflow-hidden mr-2 md:mr-0s'
      >
        <span className='absolute top-2 left-0 w-full px-2 truncate text-center'>
          {step.type === 'question' ? step.data.question || "" : step.data.title || ""}
        </span>
        <StepIcon step={step} size={24} />
        <span className='absolute bottom-2 right-2 text-sm opacity-50'>{index + 1}</span>
      </FancyCard>
    </div>
  )
}

export default StepNavigatorCard