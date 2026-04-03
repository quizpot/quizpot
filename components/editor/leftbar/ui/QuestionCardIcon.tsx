import { QuestionType } from '@/lib/QuizFile'
import { Check, Copy, Keyboard, RectangleHorizontal } from 'lucide-react'

const QuestionCardIcon = ({ questionType }: { questionType: QuestionType }) => {
  if (questionType === 'multipleChoice') {
    return <Copy size={24} />
  } else if (questionType === 'trueFalse') {
    return <Check size={24} />
  } else if (questionType === 'slide') {
    return <RectangleHorizontal size={24} />
  } else if (questionType === 'shortAnswer') {
    return <Keyboard size={24} />
  } else {
    return questionType
  }
}

export default QuestionCardIcon