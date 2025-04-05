"use client"
import { EditorCurrentQuestionContext, EditorQuizFileContext } from '@/app/editor/page'
import React, { useContext } from 'react'
import QuestionImage from './QuestionImage'

const QuestionEditor = () => {
  const quizFileContext = useContext(EditorQuizFileContext)
  const currentQuestionIndexContext = useContext(EditorCurrentQuestionContext)

  if (!quizFileContext) {
    throw new Error("No quiz file context found")
  }

  if (!currentQuestionIndexContext) {
    throw new Error("No current question index context found")
  }

  return (
    <section className='h-full w-full'>
      <div className='h-full w-full overflow-y-auto'
        style={
          quizFileContext.quizFile.theme.background.includes('base64') ? 
            { backgroundImage: `url(${quizFileContext.quizFile.theme.background})` }
            :
            { backgroundColor: `${quizFileContext.quizFile.theme.background}` }
        }
      >
        <div className='p-4'>
          <div className='bg-white rounded'>
            <input 
              type='text'
              className='p-2 rounded w-full text-2xl text-center'
              value={ quizFileContext.quizFile.questions[currentQuestionIndexContext.currentQuestionIndex].question }
              onChange={(e) => { 
                const updatedQuestions = [...quizFileContext.quizFile.questions]
                
                updatedQuestions[currentQuestionIndexContext.currentQuestionIndex] = {
                  ...updatedQuestions[currentQuestionIndexContext.currentQuestionIndex],
                  question: e.target.value,
                }

                quizFileContext.setQuizFile({
                  ...quizFileContext.quizFile,
                  questions: updatedQuestions,
                })
              }}
            />
          </div>
        </div>
        <div>
          <QuestionImage />
        </div>
      </div>
      {/** add a question editor on the side */}
    </section>
  )
}

export default QuestionEditor