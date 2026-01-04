"use client"
import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '../ui/dialog'
import FancyButton from '../ui/fancy-button'
import Link from 'next/link'
import QuizFileInput from '../ui/QuizFileInput'
import { useToast } from '../ui/toaster'
import { useTranslations } from 'next-intl'
import { saveQuiz } from '@/lib/client/IndexedDB'

const NewQuizDialog = () => {
  const t = useTranslations('QuizzesPage')
  const toast = useToast()

  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null || e.target.files.length === 0) {
      toast('No file selected', { variant: 'error' })
      return
    }

    const file = e.target.files[0]
    const fileText = await file.text()

    try {
      const jsonObj = JSON.parse(fileText)
      const newQuizId = crypto.randomUUID()
      await saveQuiz(jsonObj, newQuizId)
      window.location.href = '/editor/' + newQuizId
    } catch (e) {
      console.error(e)
      toast('Error parsing quiz file', { variant: 'error' })
    }
  }
    
  return (
    <Dialog>
      <DialogTrigger color='green'>
      { t('newQuizBtn') }
      </DialogTrigger>
      <DialogContent>
        <DialogHeader title={ t('newQuizBtn') } />
        <section className="relative flex-grow overflow-y-auto">
          <div className='w-full h-full p-4 flex flex-col gap-4'>
            <FancyButton color='green' asChild>
              <Link href='/editor/new'>
                { t('createNew') }
              </Link>
            </FancyButton>
            <FancyButton color='yellow' asChild>
              <Link href='/quizzes/generate'>
                { t('generate') }
              </Link>
            </FancyButton>
            <QuizFileInput onChange={ onFile } className='w-full text-center' />
          </div>
        </section>
      </DialogContent>
    </Dialog>
  )
}

export default NewQuizDialog