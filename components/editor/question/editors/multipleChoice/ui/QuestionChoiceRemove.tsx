import { useEditorCurrentQuestion } from '@/components/editor/providers/EditorCurrentQuestionProvider'
import { useEditorQuizFile } from '@/components/editor/providers/EditorQuizFileProvider'
import FancyButton from '@/components/ui/fancy-button'
import { MultipleChoiceQuestion } from '@/lib/QuizFile'
import { useTranslations } from 'next-intl'
import React from 'react'

const QuestionChoiceRemove = () => {
  const t = useTranslations('MultipleChoiceEditor')

  const { quizFile, setQuizFile } = useEditorQuizFile()
  const { currentQuestionIndex } = useEditorCurrentQuestion()
  const currentQuestion = quizFile.questions[currentQuestionIndex] as MultipleChoiceQuestion

  const onClick = () => {
    currentQuestion.choices.pop()

    setQuizFile({
      ...quizFile,
      questions: [
        ...quizFile.questions.slice(0, currentQuestionIndex),
        {
          ...currentQuestion,
          choices: currentQuestion.choices
        },
        ...quizFile.questions.slice(currentQuestionIndex + 1)
      ]
    })
  }

  if (currentQuestion.choices.length <= 2) {
    return null
  }

  return ( 
    <FancyButton onClick={ onClick } color='red' className='w-full'>
      { t('removeChoice') }
    </FancyButton>
  )
}

export default QuestionChoiceRemove