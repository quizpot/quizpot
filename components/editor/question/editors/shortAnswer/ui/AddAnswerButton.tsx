import { useEditorCurrentQuestion } from '@/components/editor/providers/EditorCurrentQuestionProvider'
import { useEditorQuizFile } from '@/components/editor/providers/EditorQuizFileProvider'
import FancyButton from '@/components/ui/fancy-button'
import { ShortAnswerQuestion } from '@/lib/QuizFile'
import { useTranslations } from 'next-intl'
import React from 'react'

const AddAnswerButton = () => {
  const t = useTranslations('Buttons')
  const { quizFile, setQuizFile } = useEditorQuizFile()
  const { currentQuestionIndex } = useEditorCurrentQuestion()
  const currentQuestion = quizFile.questions[currentQuestionIndex] as ShortAnswerQuestion

  const onClick = () => {
    const updatedQuestions = [...quizFile.questions]

    if (updatedQuestions[currentQuestionIndex].questionType !== 'shortAnswer') return

    updatedQuestions[currentQuestionIndex] = {
      ...updatedQuestions[currentQuestionIndex],
      answers: [...currentQuestion.answers, 'New Answer']
    }

    setQuizFile({ ...quizFile, questions: updatedQuestions })
  }

  return (
    <FancyButton onClick={ onClick } color='green' className='font-semibold w-full'>
      { t('addAnswer') }
    </FancyButton>
  )
}

export default AddAnswerButton