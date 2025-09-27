import TextInput from '@/components/ui/TextInput'
import { getBackgroundStyles } from '@/lib/client/BackgroundStyles'
import React from 'react'
import QuestionImage from '../../ui/QuestionImage'
import { useEditorQuizFile } from '@/components/editor/providers/EditorQuizFileProvider'
import { useEditorCurrentQuestion } from '@/components/editor/providers/EditorCurrentQuestionProvider'
import { TrueFalseQuestion } from '@/lib/misc/QuizFile'
import TrueFalsePropertySidebar from './ui/TrueFalsePropertySidebar'
import TrueFalseChoiceInput from './ui/TrueFalseChoiceInput'

const TrueFalseEditor = () => {
  const { quizFile, setQuizFile } = useEditorQuizFile()
  const { currentQuestionIndex } = useEditorCurrentQuestion()
  const currentQuestion = quizFile.questions[currentQuestionIndex] as TrueFalseQuestion

  return (
    <section className='max-h-[calc(100vh-58px)] h-[calc(100vh-58px)] w-full overflow-hidden flex'>
      <div className='h-full w-full flex justify-between flex-col gap-4' style={ getBackgroundStyles(quizFile.theme.background) }>
        <div className='p-4 shrink-0'>
          <TextInput value={ currentQuestion.question } className='text-2xl p-4 w-full text-center' 
            onChange={(e) => {
              const updatedQuestions = [...quizFile.questions]

              if (updatedQuestions[currentQuestionIndex].questionType !== 'trueFalse') return

              updatedQuestions[currentQuestionIndex] = {
                ...updatedQuestions[currentQuestionIndex],
                question: e.target.value,
              }

              setQuizFile({ ...quizFile, questions: updatedQuestions })
            }}
          />
        </div>
        <div className='flex-grow flex items-center justify-center h-full'>
          <QuestionImage />
        </div>
        <div className='shrink-0 max-h-96 overflow-y-scroll'>
          <div className='grid grid-cols-2 p-4 gap-4'>
            <TrueFalseChoiceInput v={ true } />
            <TrueFalseChoiceInput v={ false } />
          </div>
        </div>
      </div>
      <TrueFalsePropertySidebar />
    </section>
  )
}

export default TrueFalseEditor