"use client"
import Header from '@/components/home/Header'
import QuizCard from '@/components/quizzes/QuizCard'
import Button from '@/components/ui/ButtonOld'
import DeviceScreenUnsupported from '@/components/ui/unsupported-device-overlay'
import QuizFileInput from '@/components/ui/QuizFileInput'
import { useToast } from '@/components/ui/Toaster'
import { getAllQuizzes, saveQuiz } from '@/lib/client/IndexedDB'
import { QuizFile } from '@/lib/misc/QuizFile'
import React, { useEffect } from 'react'
import { useTranslations } from 'next-intl'
import FancyButton from '@/components/ui/fancy-button'
import Link from 'next/link'

const QuizzesPage = () => {
  const t = useTranslations('QuizzesPage')
  const toast = useToast()
  
  const [quizzes, setQuizzes] = React.useState<QuizFile[]>([])

  useEffect(() => {
    const loadQuizzes = async () => {
      try {
        const loadedQuizzesArray = await getAllQuizzes()

        loadedQuizzesArray.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

        setQuizzes(loadedQuizzesArray)
      } catch (error) {
        toast('Error loading quizzes', { variant: 'error' })
        console.error('Error loading quizzes:', error)
      }
    }
    
    loadQuizzes()
  }, [toast]) 

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
    <>
      <DeviceScreenUnsupported />
      <Header />
      <section className='w-full mt-32'>
        <h1 className='text-2xl lg:text-4xl font-bold text-center p-4'>{ t('title') }</h1>
        <div className='max-w-sm mx-auto text-center p-4 flex flex-col gap-4'>
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
        <div className='container mx-auto w-full grid gap-4 p-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
          {
            quizzes.map((quiz) => (
              <QuizCard key={ quiz.id } quiz={ quiz } id={ quiz.id } />
            ))
          }
        </div>
      </section>
    </>
  )
}

export default QuizzesPage