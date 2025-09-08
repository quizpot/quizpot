"use client"
import React from 'react'
import QuestionCard from '../question/QuestionCard'
import Link from 'next/link'
import pjson from '@/package.json'
import { useEditorQuizFile } from '../providers/EditorQuizFileProvider'
import NewQuestionDialog from './ui/NewQuestionDialog'
import NewSlideDialog from './ui/NewSlideDialog'

const EditorLeftBar = () => {
  const { quizFile } = useEditorQuizFile()

  return (
    <section className='min-w-52 w-52 h-[calc(100vh_-_56px)] flex flex-col box-border'>
      <div className='flex flex-col gap-2 overflow-y-auto h-auto'>
        {
          quizFile.questions.map((question, index) => {
            return (
              <QuestionCard key={index} question={question} index={index} />
            )
          })
        }
      </div>
      <div className='flex flex-col gap-4 p-4'>
        <NewQuestionDialog />
        <NewSlideDialog />
        <div className='text-sm text-center'>
          <Link href="https://github.com/kragleh/quizpot">
            {new Date().getFullYear() === 2025 ? '2025 ' : `${new Date().getFullYear()} - 2025 `} © QuizPot
          </Link>
          {' '} v{ pjson.version } by{' '}
          <Link href="https://kragleh.com" className='underline underline-offset-2 decoration-[#F90]'>
            kragleh.com
          </Link>
        </div>
      </div>
    </section>
  )
}

export default EditorLeftBar