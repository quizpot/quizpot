import { QuizStep } from '@quizpot/quizcore'
import { Copy, Diff, Grid2X2Plus, LayoutPanelTop, LayoutTemplate, TextCursorInput, Trash } from 'lucide-react';
import FancyCard from '@/components/ui/fancy-card';
import { useEditorCurrentStep } from '../providers/editor-current-step-provider';
import FancyButton from '@/components/ui/fancy-button';
import { useEditorQuiz } from '../providers/editor-quiz-provider';

const StepNavigatorCard = ({ step, index }: { step: QuizStep, index: number }) => {
  const { quiz, setQuiz } = useEditorQuiz()
  const { setCurrentStep, currentStep } = useEditorCurrentStep()

  let Icon = null;

  const truncate = (text: string, limit: number) => {
    return text.length > limit ? `${text.substring(0, limit)}...` : text;
  };

  if (step.type === 'question') {
    switch (step.data.questionType) {
      case 'multipleChoice':
        Icon = Grid2X2Plus
        break
      case 'trueFalse':
        Icon = Diff
        break
      case 'shortAnswer':
        Icon = TextCursorInput
        break
    }
  } else if (step.type === 'slide') {
    switch (step.data.slideType) {
      case 'title':
        Icon = LayoutTemplate
        break
      case 'content':
        Icon = LayoutPanelTop
        break
    }
  }

  const copyStep = () => {
    const updatedSteps = [...quiz.steps];
    const stepToCopy = { ...updatedSteps[index] };
    updatedSteps.splice(index + 1, 0, stepToCopy);
    setQuiz({ ...quiz, steps: updatedSteps });
  }

  const deleteStep = () => {
    const updatedSteps = quiz.steps.filter((_, i) => i !== index);
    setQuiz({ ...quiz, steps: updatedSteps });
  }

  return (
    <div className='flex gap-2 w-full min-w-[200px] md:min-w-0 shrink-0 group'>
      <div className='flex flex-col items-center justify-center gap-2'>
        <FancyButton size='sm' color='background' onClick={ copyStep }>
          <Copy />
        </FancyButton>
        <FancyButton size='sm' color='background' onClick={ deleteStep }>
          <Trash />
        </FancyButton>
      </div>
      <FancyCard 
        onClick={ () => { setCurrentStep(index) } } 
        color={ index === currentStep ? 'foreground' : 'background' }
        className='flex-1 w-full relative aspect-video flex justify-center items-center overflow-hidden mr-2 md:mr-0 md:mb-4'
      >
        <span className='absolute top-2 left-0 overflow-ellipsis text-center w-full px-2'>
          { step.type === 'question' ? truncate(step.data.question || "", 20) : truncate(step.data.title || "", 20) }
        </span>
        { Icon && <Icon size={24} /> }
        <span className='absolute bottom-2 right-2 text-sm opacity-50'>{ index + 1 }</span>
      </FancyCard>
    </div>
  )
}

export default StepNavigatorCard