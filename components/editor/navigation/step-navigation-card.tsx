import { QuizStep } from '@quizpot/quizcore'
import { Diff, Grid2X2Plus, LayoutPanelTop, LayoutTemplate, TextCursorInput } from 'lucide-react';
import FancyCard from '@/components/ui/fancy-card';
import { useEditorCurrentStep } from '../providers/editor-current-step-provider';

const StepNavigatorCard = ({ step, index }: { step: QuizStep, index: number }) => {
  const { setCurrentStep } = useEditorCurrentStep()
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

  return (
    <FancyCard onClick={ () => { setCurrentStep(index) } } className='relative aspect-video flex justify-center items-center mr-2 md:mr-0 md:mb-4'>
      <span className='absolute top-2 left-0 overflow-ellipsis text-center w-full'>
        { step.type === 'question' ? truncate(step.data.question, 20) : truncate(step.data.title, 20) }
      </span>
      { Icon && <Icon size={24} /> }
      <span className='absolute bottom-2 right-2 text-sm opacity-50'>{ index + 1 }</span>
    </FancyCard>
  )
}

export default StepNavigatorCard