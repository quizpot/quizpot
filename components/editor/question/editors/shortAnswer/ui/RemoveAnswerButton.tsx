import { useEditorCurrentQuestion } from '@/components/editor/providers/EditorCurrentQuestionProvider'
import { useEditorQuizFile } from '@/components/editor/providers/EditorQuizFileProvider'
import FancyButton from '@/components/ui/fancy-button'
import { ShortAnswerQuestion } from '@/lib/QuizFile'
import { useTranslations } from 'next-intl'
import React from 'react'

const RemoveAnswerButton = () => {
  const t = useTranslations('Buttons')
  const { quizFile, setQuizFile } = useEditorQuizFile()
  const { currentQuestionIndex } = useEditorCurrentQuestion()
  const currentQuestion = quizFile.questions[currentQuestionIndex] as ShortAnswerQuestion

  const onClick = () => {
    const updatedQuestions = [...quizFile.questions]

    if (updatedQuestions[currentQuestionIndex].questionType !== 'shortAnswer') return

    const answers = [...currentQuestion.answers]
    answers.pop()

    updatedQuestions[currentQuestionIndex] = {
      ...updatedQuestions[currentQuestionIndex],
      answers
    }

    setQuizFile({ ...quizFile, questions: updatedQuestions })
  }

  return (
    <FancyButton onClick={ onClick } color='red' className='w-full'>
      { t('removeAnswer') }
    </FancyButton>
  )
}

export default RemoveAnswerButton