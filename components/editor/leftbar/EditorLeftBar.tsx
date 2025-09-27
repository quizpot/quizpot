"use client"
import React from 'react'
import QuestionCard from './ui/QuestionCard'
import { useEditorQuizFile } from '../providers/EditorQuizFileProvider'
import NewQuestionDialog from './ui/NewQuestionDialog'
import NewSlideDialog from './ui/NewSlideDialog'

const EditorLeftBar = () => {
  const { quizFile } = useEditorQuizFile()

  return (
    <section className='hidden md:flex min-w-52 w-52 h-[calc(100vh_-_56px)] flex-col box-border'>
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
      </div>
    </section>
  )
}

export default EditorLeftBar