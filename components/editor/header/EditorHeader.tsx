import Button from '@/components/ui/Button'
import React, { useContext } from 'react'
import { EditorQuizFileContext } from '../providers/EditorQuizFileContext'
import { redirect } from 'next/navigation'
import { useToast } from '@/components/ui/Toaster'
import QuizSettings from './QuizSettings'

const EditorHeader = ({ quizId }: { quizId: string }) => {
  const addToast = useToast()
  const quizFileContext = useContext(EditorQuizFileContext)

  if (!quizFileContext) {
    throw new Error("No quiz file context found")
  }

  return (
    <header className='flex justify-between items-center p-2 shadow'>
      <div className='flex gap-4 items-center'>
        <Button href={'/'} variant='secondary' className='text-2xl font-semibold'>
          Quizpot
        </Button>
        <h1 className='text-xl font-semibold'>{ quizFileContext.quizFile.title }</h1>
      </div>

      <div className='flex gap-2 items-center'>
        <div className='flex gap-1 font-semibold'>
          <QuizSettings />
          <Button href='/' variant="blue">
            Exit
          </Button>
          <Button onClick={() => {
            if (quizId === 'new') {
              const newQuizId = crypto.randomUUID()
              localStorage.setItem('quiz:' + newQuizId, JSON.stringify(quizFileContext.quizFile))
              redirect(`/quizzes`)
            } else {
              localStorage.setItem('quiz:' + quizId, JSON.stringify(quizFileContext.quizFile))
              addToast({ message: 'Quiz saved', type: 'success' })
            }
          }} variant="green">
            Save
          </Button>
        </div>
      </div>
    </header>
  )
}

export default EditorHeader