import Button from '@/components/ui/ButtonOld'
import React from 'react'
import { useToast } from '@/components/ui/Toaster'
import QuizSettings from './QuizSettings'
import { useEditorQuizFile } from '../providers/EditorQuizFileProvider'
import { saveQuiz } from '@/lib/client/IndexedDB'

const EditorHeader = ({ quizId }: { quizId: string }) => {
  const toast = useToast() 
  const { quizFile } = useEditorQuizFile()

  const onSave = async () => {
    try {
      if (quizId === 'new') {
        const newQuizId = crypto.randomUUID() 
        await saveQuiz(quizFile, newQuizId)
        window.location.href = `/editor/${newQuizId}`
      } else {
        await saveQuiz(quizFile, quizId)
        toast('Quiz saved', { variant: 'success' })
      }
    } catch (e) {
      if (e instanceof Error && e.message.includes('QuotaExceededError')) {
        toast('Unable to save quiz to browser, downloaded it instead!', { variant: 'error' })

        const a = document.createElement("a")
        const jsonString = JSON.stringify(quizFile, null, 2)
        const file = new Blob([jsonString], {type: 'text/json'})
        a.href = URL.createObjectURL(file)
        a.download = quizFile.title + '.qp'
        a.click()
      } else {
        toast('Error saving quiz', { variant: 'error' })
        console.log(e)
      }
    }
  }

  return (
    <header className='flex gap-4 justify-between items-center p-2 shadow'>
      <div className='flex flex-col md:flex-row gap-2 items-center'>
        <Button href={'/'} variant='gray' className='text-2xl font-semibold'>
          Quizpot
        </Button>
        <h1 className='text-xl font-semibold'>{ quizFile.title }</h1>
      </div>

      <div className='flex gap-2 items-center justify-center'>
        <div className='flex gap-1 items-center justify-center'>
          <QuizSettings />
          <Button href='/quizzes' variant="blue" className='font-semibold'>
            Exit
          </Button>
          <Button onClick={ onSave } variant="green" className='font-semibold'>
            Save
          </Button>
        </div>
      </div>
    </header>
  )
}

export default EditorHeader