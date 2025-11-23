import NumberInput from '@/components/ui/number-input'
import React from 'react'
import { useEditorQuizFile } from '../../providers/EditorQuizFileProvider'
import { useEditorCurrentQuestion } from '../../providers/EditorCurrentQuestionProvider'

const DisplayTimeoutEditor = () => {
  const { quizFile, setQuizFile } = useEditorQuizFile()
  const { currentQuestionIndex } = useEditorCurrentQuestion()
  const currentQuestion = quizFile.questions[currentQuestionIndex]

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedQuestions = [...quizFile.questions]

    if (updatedQuestions[currentQuestionIndex].questionType === 'slide') return

    updatedQuestions[currentQuestionIndex] = {
      ...updatedQuestions[currentQuestionIndex],
      questionDisplayTime: Number.parseInt(e.target.value)
    }

    setQuizFile({ ...quizFile, questions: updatedQuestions })
  }

  if (currentQuestion.questionType === 'slide') return <></>

  return <NumberInput onChange={ onChange } value={ currentQuestion.questionDisplayTime } />
}

export default DisplayTimeoutEditor