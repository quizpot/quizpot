import Button from '@/components/ui/Button'
import React from 'react'
import { redirect } from 'next/navigation'
import { useToast } from '@/components/ui/Toaster'
import QuizSettings from './QuizSettings'
import { useEditorQuizFile } from '../providers/EditorQuizFileProvider'

const EditorHeader = ({ quizId }: { quizId: string }) => {
  const addToast = useToast()
  const { quizFile } = useEditorQuizFile()

  const onSave = () => {
    try {
      if (quizId === 'new') {
        const newQuizId = crypto.randomUUID()
        localStorage.setItem('quiz:' + newQuizId, JSON.stringify(quizFile))
        redirect(`/quizzes`)
      } else {
        localStorage.setItem('quiz:' + quizId, JSON.stringify(quizFile))
        addToast({ message: 'Quiz saved', type: 'success' })
      }
    } catch (e) {
      if (e instanceof Error && e.message.includes('QuotaExceededError')) {
        addToast({ message: 'Unable to save quiz to browser, downloaded it instead!', type: 'error' })

        const a = document.createElement("a")
        const jsonString = JSON.stringify(quizFile, null, 2)
        const file = new Blob([jsonString], {type: 'text/json'})
        a.href = URL.createObjectURL(file)
        a.download = quizFile.title + '.qp'
        a.click()
      } else {
        addToast({ message: 'Error saving quiz', type: 'error' })
        console.log(e)
      }
    }
  }

  return (
    <header className='flex justify-between items-center p-2 shadow'>
      <div className='flex gap-4 items-center'>
        <Button href={'/'} variant='gray' className='text-2xl font-semibold'>
          Quizpot
        </Button>
        <h1 className='text-xl font-semibold'>{ quizFile.title }</h1>
      </div>

      <div className='flex gap-2 items-center'>
        <div className='flex gap-1'>
          <QuizSettings />
          <Button href='/quizzes' variant="blue">
            Exit
          </Button>
          <Button onClick={ onSave } variant="green">
            Save
          </Button>
        </div>
      </div>
    </header>
  )
}

export default EditorHeader