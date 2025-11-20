import { useEditorCurrentQuestion } from '@/components/editor/providers/EditorCurrentQuestionProvider'
import { useEditorQuizFile } from '@/components/editor/providers/EditorQuizFileProvider'
import BooleanInput from '@/components/ui/BooleanInput'
import FancyCard from '@/components/ui/fancy-card'
import { TrueFalseQuestion } from '@/lib/QuizFile'
import { Check, X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import React from 'react'

const TrueFalseChoiceEditor = ({ v }: { v: boolean }) => {
  const t = useTranslations('Buttons')
  const { quizFile, setQuizFile } = useEditorQuizFile()
  const { currentQuestionIndex } = useEditorCurrentQuestion()
  const currentQuestion = quizFile.questions[currentQuestionIndex] as TrueFalseQuestion

  const onCheckboxChange = () => {
    const newAnswer = currentQuestion.answer === v ? !v : v

    setQuizFile({
      ...quizFile,
      questions: [
        ...quizFile.questions.slice(0, currentQuestionIndex),
        {
          ...currentQuestion,
          answer: newAnswer,
        },
        ...quizFile.questions.slice(currentQuestionIndex + 1)
      ]
    })
  }

  return (
    <div className='flex gap-4'>
      <FancyCard className='text-2xl px-8 py-4 w-full' color={ v ? 'red' : 'blue' }>
        { v ? t('true') : t('false') }
      </FancyCard>
      <BooleanInput onChange={ onCheckboxChange } value={ currentQuestion.answer === v }>
        { currentQuestion.answer === v ? <Check /> : <X /> }
      </BooleanInput>
    </div>
  )
}

export default TrueFalseChoiceEditor