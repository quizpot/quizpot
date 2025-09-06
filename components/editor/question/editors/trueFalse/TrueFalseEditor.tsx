import TextInput from '@/components/ui/TextInput'
import { getBackgroundStyles } from '@/lib/misc/BackgroundStyles'
import React from 'react'
import QuestionImage from '../../ui/QuestionImage'
import { QuizFile, TrueFalseQuestion } from '@/lib/misc/QuizFile'

const TrueFalseEditor = ({ 
  quizFile, 
  setQuizFile, 
  currentQuestionIndex,
  currentQuestion,
}: {
  quizFile: QuizFile,
  setQuizFile: (quizFile: QuizFile) => void,
  currentQuestionIndex: number,
  currentQuestion: TrueFalseQuestion,
}) => {
  return (
    <section className='max-h-[calc(100vh-58px)] h-[calc(100vh-58px)] w-full overflow-hidden'>
      <div className='h-full w-full flex justify-between flex-col gap-4' style={ getBackgroundStyles(quizFile.theme.background) }>
        <div className='p-4 shrink-0'>
          <TextInput value={ currentQuestion.question } className='text-2xl p-4 w-full text-center' 
            onChange={(e) => {
              const updatedQuestions = [...quizFile.questions]

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
        <div className='shrink-0'>
          <div className='grid grid-cols-2 p-4 gap-4'>
            {/** TODO: add true/false choices */}
          </div>
        </div>
      </div>
      {/** add a question properly editor on the side */}
    </section>
  )
}

export default TrueFalseEditor