import { useEditorCurrentQuestion } from '@/components/editor/providers/EditorCurrentQuestionProvider'
import { useEditorQuizFile } from '@/components/editor/providers/EditorQuizFileProvider'
import TextInput from '@/components/ui/TextInput'
import { ShortAnswerQuestion } from '@/lib/QuizFile'
import React from 'react'

const AnswerEditor = ({ index }: { index: number }) => {
  const { quizFile, setQuizFile } = useEditorQuizFile()
  const { currentQuestionIndex } = useEditorCurrentQuestion()
  const currentQuestion = quizFile.questions[currentQuestionIndex] as ShortAnswerQuestion

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedQuestions = [...quizFile.questions]

    if (updatedQuestions[currentQuestionIndex].questionType !== 'shortAnswer') return

    updatedQuestions[currentQuestionIndex] = {
      ...updatedQuestions[currentQuestionIndex],
      answers: [...currentQuestion.answers.slice(0, index), e.target.value, ...currentQuestion.answers.slice(index + 1)]
    }

    setQuizFile({ ...quizFile, questions: updatedQuestions })
  }

  return <TextInput value={ currentQuestion.answers[index] } color='white' className='text-2xl p-4 w-full text-center' onChange={ onChange }/>
}

export default AnswerEditor