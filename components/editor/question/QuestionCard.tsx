"use client"
import { Question } from '@/lib/misc/QuizFile'
import React from 'react'
import { BsArrowDown, BsArrowUp } from 'react-icons/bs'
import QuestionCardIcon from './QuestionCardIcon'
import { PiCards } from 'react-icons/pi'
import { BiTrash } from 'react-icons/bi'
import { useEditorQuizFile } from '../providers/EditorQuizFileProvider'
import { useEditorCurrentQuestion } from '../providers/EditorCurrentQuestionProvider'

const QuestionCard = ({ question, index }: { question: Question, index: number }) => {
  const { quizFile, setQuizFile } = useEditorQuizFile()
  const { setCurrentQuestionIndex } = useEditorCurrentQuestion()
  const length = quizFile.questions.length

  let title = "Unsupported Type"

  if (question.questionType !== 'slide') {
    title = question.question
  }

  if (question.questionType === 'slide') {
    if (question.layout.slideType === 'title') {
      title = question.layout.title
    }

    if (question.layout.slideType === 'titleAndText') {
      title = question.layout.title
    }

    if (question.layout.slideType === 'titleAndTextWithImage') {
      title = question.layout.title
    }

    if (question.layout.slideType === 'titleImageText') {
      title = question.layout.title
    }
  }

  return (
    <div key={index} onClick={() => { setCurrentQuestionIndex(index) }} className='w-full hover:cursor-pointer pb-2'>
      <h1 className='text-xs p-2 font-semibold truncate'>{index + 1}. { title }</h1>
      <div className='px-2 flex'>
        <div className='flex flex-col items-center justify-center gap-4 p-1'>
          <div
            onClick={() => {
              const newQuestions = [...quizFile.questions]
              const questionToDuplicate = newQuestions[index]
              newQuestions.splice(index + 1, 0, { ...questionToDuplicate })
              setQuizFile({ ...quizFile, questions: newQuestions })
            }}
            className={'p-1 hover:bg-gray-200 rounded-full'}
          >
            <PiCards />
          </div>
          <div
            onClick={() => {
              const newQuestions = [...quizFile.questions]
              newQuestions.splice(index, 1)
              setQuizFile({ ...quizFile, questions: newQuestions })
            }}
            className={'p-1 hover:bg-gray-200 rounded-full' + (length > 1 ? '' : ' hidden')}
          >
            <BiTrash />
          </div>
        </div>
        <div className='aspect-video w-full bg-neutral-200 border-neutral-400 rounded flex items-center justify-center'>
          <QuestionCardIcon questionType={question.questionType} />
        </div>
        <div className={'flex flex-col items-center justify-center gap-4 p-1' + (length > 1 ? '' : ' hidden')}>
          <div
            onClick={() => {
              const newQuestions = [...quizFile.questions];
              [newQuestions[index], newQuestions[index - 1]] = [newQuestions[index - 1], newQuestions[index]]
              setQuizFile({ ...quizFile, questions: newQuestions })
            }}
            className={'p-1 hover:bg-gray-200 rounded-full' + (index == 0 ? ' hidden' : '')}
          >
            <BsArrowUp />
          </div>
          <div
            onClick={() => {
              const newQuestions = [...quizFile.questions];
              [newQuestions[index], newQuestions[index + 1]] = [newQuestions[index + 1], newQuestions[index]]
              setQuizFile({ ...quizFile, questions: newQuestions })
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