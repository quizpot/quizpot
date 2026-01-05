import React from 'react'
import { useToast } from '@/components/ui/toaster'
import QuizSettings from './QuizSettings'
import { useEditorQuizFile } from '../providers/EditorQuizFileProvider'
import { saveQuiz } from '@/lib/client/IndexedDB'
import FancyButton from '@/components/ui/fancy-button'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

const EditorHeader = ({ quizId }: { quizId: string }) => {
  const t = useTranslations('Buttons')
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
    <header className='flex gap-4 justify-between items-center p-2'>
      <div className='flex flex-col md:flex-row gap-4 items-center'>
        <FancyButton className='text-xl font-semibold mb-2' size='sm' asChild>
          <Link href={'/'}>
            Quizpot
          </Link>
        </FancyButton>
        <h1 className='text-xl font-semibold'>{ quizFile.title }</h1>
      </div>

      <div className='flex gap-2 items-center justify-center'>
        <QuizSettings />
        <FancyButton color="blue" asChild>
          <Link href='/quizzes'>
            { t('exit') }
          </Link>
        </FancyButton>
        <FancyButton onClick={ onSave } color="green">
          { t('save') }
        </FancyButton>
      </div>
    </header>
  )
}

export default EditorHeader