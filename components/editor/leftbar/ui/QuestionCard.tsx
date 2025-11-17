"use client"
import { Question } from '@/lib/QuizFile'
import React from 'react'
import QuestionCardIcon from './QuestionCardIcon'
import { PiCards } from 'react-icons/pi'
import { BiTrash } from 'react-icons/bi'
import { useEditorQuizFile } from '../../providers/EditorQuizFileProvider'
import { useEditorCurrentQuestion } from '../../providers/EditorCurrentQuestionProvider'
import FancyCard from '@/components/ui/fancy-card'

const QuestionCard = ({ question, index }: { question: Question, index: number }) => {
  const { quizFile, setQuizFile } = useEditorQuizFile()
  const { setCurrentQuestionIndex, currentQuestionIndex } = useEditorCurrentQuestion()
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
    <section key={index} onClick={() => { setCurrentQuestionIndex(index) }} className={'hover:cursor-pointer rounded pb-2 shrink-0' + (index == currentQuestionIndex ? ' bg-black/10 dark:bg-white/10' : '')}>
      <h1 className='text-xs p-2 font-semibold truncate'>{index + 1}. { title }</h1>
      <div className='px-2 flex'>
        <div className='flex flex-col items-center justify-center gap-4 pr-2'>
          <div
            onClick={() => {
              const newQuestions = [...quizFile.questions]
              const questionToDuplicate = newQuestions[index]
              newQuestions.splice(index + 1, 0, { ...questionToDuplicate })
              setQuizFile({ ...quizFile, questions: newQuestions })
            }}
            className={'p-1 hover:bg-black/20 hover:dark:bg-white/10 rounded-full'}
          >
            <PiCards />
          </div>
          <div
            onClick={() => {
              const newQuestions = [...quizFile.questions]
              newQuestions.splice(index, 1)
              setQuizFile({ ...quizFile, questions: newQuestions })
            }}
            className={'p-1 hover:bg-black/20 hover:dark:bg-white/10 rounded-full' + (length > 1 ? '' : ' hidden')}
          >
            <BiTrash />
          </div>
        </div>
        <FancyCard className='mb-2 aspect-video h-full md:w-full bg-neutral-200 border-neutral-400 rounded flex items-center justify-center'>
          <QuestionCardIcon questionType={question.questionType} />
        </FancyCard>
      </div>
    </section>
  )
}

export default QuestionCard