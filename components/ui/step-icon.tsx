import { QuizStep, SafeQuizStep } from '@quizpot/quizcore'
import { Diff, FileQuestionMark, Grid2X2Plus, LayoutPanelTop, LayoutTemplate, LucideProps, TextCursorInput } from 'lucide-react'

interface StepIconProps extends LucideProps {
  step?: QuizStep | SafeQuizStep
}

const StepIcon = ({ step, ...props }: StepIconProps) => {
  let Icon = FileQuestionMark

  if (!step) return <Icon { ...props } />

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

  return <Icon { ...props } />
}

export default StepIcon