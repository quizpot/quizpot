"use client"
import { EditorCurrentQuestionContext, EditorQuizFileContext } from '@/app/editor/page'
import React, { useContext } from 'react'
import QuestionImage from './QuestionImage'
import QuestionChoices from './QuestionChoices'
import QuestionChoiceAdd from './QuestionChoiceAdd'
import QuestionChoiceRemove from './QuestionChoiceRemove'

const QuestionEditor = () => {
  const quizFileContext = useContext(EditorQuizFileContext)
  const currentQuestionIndexContext = useContext(EditorCurrentQuestionContext)

  if (!quizFileContext) {
    throw new Error("No quiz file context found")
  }

  if (!currentQuestionIndexContext) {
    throw new Error("No current question index context found")
  }

  if (quizFileContext === undefined) {
    return <></>
  }

  const { quizFile, setQuizFile } = quizFileContext
  const { currentQuestionIndex } = currentQuestionIndexContext

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
            {quizFile.questions && quizFile.questions[currentQuestionIndex] ? (
              <input
                type="text"
                className='p-2 rounded w-full text-2xl text-center'
                value={quizFile.questions[currentQuestionIndex].question}
                onChange={(e) => {
                  const updatedQuestions = [...quizFile.questions];
                  updatedQuestions[currentQuestionIndex] = {
                    ...updatedQuestions[currentQuestionIndex],
                    question: e.target.value,
                  };
                  setQuizFile({ ...quizFile, questions: updatedQuestions });
                }}
              />
            ) : (
              <p>Loading question...</p>
            )}
          </div>
        </div>
        <div>
          <QuestionImage />
        </div>
        <div className='grid grid-cols-2 p-4 gap-4'>
          <QuestionChoices />
        </div>
        <div className='flex gap-4 items-stretch'>
          <QuestionChoiceAdd />
          <QuestionChoiceRemove />
        </div>
      </div>
      {/** add a question editor on the side */}
    </section>
  )
}

export default QuestionEditor