"use client"
import { EditorCurrentQuestionContext, EditorQuizFileContext } from '@/app/editor/page'
import { Question } from '@/lib/QuizFile'
import React, { useContext } from 'react'
import { BsArrowDown, BsArrowUp } from 'react-icons/bs'

const QuestionCard = ({ question, index }: { question: Question, index: number }) => {
  const quizFileContext = useContext(EditorQuizFileContext)
  const currentQuestionIndexContext = useContext(EditorCurrentQuestionContext)
  
  if (!quizFileContext) {
    throw new Error("No quiz file context found")
  }

  if (!currentQuestionIndexContext) {
    throw new Error("No current question index context found")
  }

  const length = quizFileContext.quizFile.questions.length

  return (
    <div key={index} onClick={() => { currentQuestionIndexContext.setCurrentQuestionIndex(index) }} className='w-full hover:cursor-pointer pb-2'>
      <h1 className='text-xs p-2 font-semibold truncate'>{index + 1}. {question.question}</h1>
      <div className='px-2 flex'>
        <div className='aspect-video w-full bg-neutral-200 border-neutral-400 rounded'>
          {/** add an icon to the question type */}
        </div>
        <div className={'flex flex-col items-center justify-center gap-4 p-1' + (length > 1 ? '' : ' hidden')}>
          <div
            onClick={() => {
              const newQuestions = [...quizFileContext.quizFile.questions];
              [newQuestions[index], newQuestions[index - 1]] = [newQuestions[index - 1], newQuestions[index]]
              quizFileContext.setQuizFile({ ...quizFileContext.quizFile, questions: newQuestions })
            }}
            className={'p-1 hover:bg-gray-200 rounded-full' + (index == 0 ? ' hidden' : '')}
          >
            <BsArrowUp />
          </div>
          <div
            onClick={() => {
              const newQuestions = [...quizFileContext.quizFile.questions];
              [newQuestions[index], newQuestions[index + 1]] = [newQuestions[index + 1], newQuestions[index]]
              quizFileContext.setQuizFile({ ...quizFileContext.quizFile, questions: newQuestions })
            }}
            className={'p-1 hover:bg-gray-200 rounded-full' + (index + 1 == length ? ' hidden' : '')}
          >
            <BsArrowDown />
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuestionCard