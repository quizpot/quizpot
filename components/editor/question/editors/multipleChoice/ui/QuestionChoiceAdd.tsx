import { useEditorCurrentQuestion } from '@/components/editor/providers/EditorCurrentQuestionProvider'
import { useEditorQuizFile } from '@/components/editor/providers/EditorQuizFileProvider'
import FancyButton from '@/components/ui/fancy-button'
import { MultipleChoiceQuestion } from '@/lib/QuizFile'
import { useTranslations } from 'next-intl'
import React from 'react'

const QuestionChoiceAdd = () => {
  const t = useTranslations('MultipleChoiceEditor')

  const { quizFile, setQuizFile } = useEditorQuizFile()
  const { currentQuestionIndex } = useEditorCurrentQuestion()
  const currentQuestion = quizFile.questions[currentQuestionIndex] as MultipleChoiceQuestion

  const onClick = () => {
    const newChoice = {
      text: "Another Choice",
      correct: false
    }

    const updatedChoices = [...currentQuestion.choices, newChoice]

    setQuizFile({
      ...quizFile,
      questions: [
        ...quizFile.questions.slice(0, currentQuestionIndex),
        {
          ...currentQuestion,
          choices: updatedChoices
        },
        ...quizFile.questions.slice(currentQuestionIndex + 1)
      ]
    })
  }

  if (currentQuestion.choices.length >= 8) {
    return null
  }

  return (
    <FancyButton onClick={ onClick } color='green' className='w-full'>
      { t('addChoice') }
    </FancyButton>
  )
}

export default QuestionChoiceAdd