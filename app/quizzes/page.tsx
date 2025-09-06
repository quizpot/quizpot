"use client"
import Header from '@/components/home/Header'
import QuizCard from '@/components/quizzes/QuizCard'
import Button from '@/components/ui/Button'
import QuizFileInput from '@/components/ui/QuizFileInput'
import { useToast } from '@/components/ui/Toaster'
import { QuizFile } from '@/lib/misc/QuizFile'
import React, { useEffect } from 'react'

const QuizzesPage = () => {
  const [quizzes, setQuizzes] = React.useState<Map<string, QuizFile>>(new Map())

  const addToast = useToast()

  useEffect(() => {
    const loadedQuizzes: Map<string, QuizFile> = new Map()

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)

      if (key && key.startsWith('quiz:')) {
        const quizData = localStorage.getItem(key)

        if (quizData) {
          try {
            const quiz = JSON.parse(quizData)
            loadedQuizzes.set(key, quiz)
          } catch (e) {
            console.error(`Failed to parse quiz data for key: ${key}`, e)
          }
        }
      }
    }

    setQuizzes(loadedQuizzes)
  }, [])

  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null || e.target.files.length === 0) {
      addToast({ message: 'No file selected', type: 'error' })
      return
    }

    const file = e.target.files[0]
    const fileText = await file.text()

    try {
      const jsonObj = JSON.parse(fileText)
      const newQuizId = crypto.randomUUID()
      localStorage.setItem('quiz:' + newQuizId, JSON.stringify(jsonObj))
      window.location.href = '/editor/' + newQuizId
    } catch (e) {
      addToast({ message: 'Error parsing quiz file, ' + e, type: 'error' })
    }
  }

  return (
    <>
      <Header />
      <section className='w-full mt-24'>
        <h1 className='text-2xl lg:text-4xl font-bold text-center p-4'>Your Quizzes</h1>
        <div className='max-w-sm mx-auto text-center p-4 flex flex-col gap-4'>
          <Button href='/editor/new' variant='green'>
            Create New Quiz
          </Button>
          <QuizFileInput onChange={ onFile } />
        </div>
        <div className='container mx-auto w-full grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
          {
            Array.from(quizzes.entries()).map(([key, quiz]) => (
              <QuizCard key={ key } quiz={ quiz } id={ key } />
            ))
          }
        </div>
      </section>
    </>
  )
}

export default QuizzesPage