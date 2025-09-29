import React from 'react'
import QuestionImage from '../../ui/QuestionImage'
import { useEditorCurrentQuestion } from '@/components/editor/providers/EditorCurrentQuestionProvider'
import { useEditorQuizFile } from '@/components/editor/providers/EditorQuizFileProvider'
import { getBackgroundStyles } from '@/lib/client/BackgroundStyles'
import TextInput from '@/components/ui/TextInput'
import { ShortAnswerQuestion } from '@/lib/misc/QuizFile'
import ShortAnswerPropertySidebar from './ui/ShortAnswerPropertySidebar'

const ShortAnswerEditor = () => {
  const { quizFile, setQuizFile } = useEditorQuizFile()
  const { currentQuestionIndex } = useEditorCurrentQuestion()

  const currentQuestion = quizFile.questions[currentQuestionIndex] as ShortAnswerQuestion

  const onQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedQuestions = [...quizFile.questions]

    if (updatedQuestions[currentQuestionIndex].questionType !== 'shortAnswer') return

    updatedQuestions[currentQuestionIndex] = {
      ...updatedQuestions[currentQuestionIndex],
      question: e.target.value,
    }

    setQuizFile({ ...quizFile, questions: updatedQuestions })
  }
  
  const onAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedQuestions = [...quizFile.questions]

    if (updatedQuestions[currentQuestionIndex].questionType !== 'shortAnswer') return

    updatedQuestions[currentQuestionIndex] = {
      ...updatedQuestions[currentQuestionIndex],
      answer: e.target.value,
    }

    setQuizFile({ ...quizFile, questions: updatedQuestions })
  }

  return (
    <section className='max-h-[calc(100vh-58px)] h-[calc(100vh-58px)] w-full overflow-hidden flex'>
      <div className='h-full w-full flex justify-between flex-col gap-4' style={ getBackgroundStyles(quizFile.theme.background) }>
        <div className='p-4 shrink-0'>
          <TextInput value={ currentQuestion.question } className='text-2xl p-4 w-full text-center' onChange={ onQuestionChange }/>
        </div>
        <div className='flex-grow flex items-center justify-center h-full'>
          <QuestionImage />
        </div>
        <div className='shrink-0 max-h-96 p-4 overflow-y-scroll'>
          <TextInput value={ currentQuestion.answer } className='text-2xl p-4 w-full text-center' onChange={ onAnswerChange }/>
        </div>
      </div>
      <ShortAnswerPropertySidebar />
    </section>
  )
}

export default ShortAnswerEditor