"use client"
import Header from '@/components/home/Header'
import QuizCard from '@/components/quizzes/QuizCard'
import Button from '@/components/ui/Button'
import DeviceScreenUnsupported from '@/components/ui/DeviceScreenUnsupported'
import QuizFileInput from '@/components/ui/QuizFileInput'
import { useToast } from '@/components/ui/Toaster'
import { getAllQuizzes, saveQuiz } from '@/lib/client/IndexedDB'
import { QuizFile } from '@/lib/misc/QuizFile'
import React, { useEffect } from 'react'

const QuizzesPage = () => {
  const [quizzes, setQuizzes] = React.useState<Map<string, QuizFile>>(new Map())
  const addToast = useToast()

  useEffect(() => {
    const loadQuizzes = async () => {
      try {
        const loadedQuizzesArray = await getAllQuizzes()
        const loadedQuizzesMap = new Map<string, QuizFile>()
        loadedQuizzesArray.forEach(quiz => {
          // @ts-expect-error db stored id
          loadedQuizzesMap.set(quiz.id, quiz)
        })
        setQuizzes(loadedQuizzesMap)
      } catch (error) {
        addToast({ message: 'Error loading quizzes', type: 'error' })
        console.error('Error loading quizzes:', error)
      }
    }
    
    loadQuizzes()
  }, [addToast])

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
      await saveQuiz(jsonObj, newQuizId)
      window.location.href = '/editor/' + newQuizId
    } catch (e) {
      addToast({ message: 'Error parsing quiz file, ' + e, type: 'error' })
    }
  }

  return (
    <>
      <DeviceScreenUnsupported />
      <Header />
      <section className='w-full mt-32'>
        <h1 className='text-2xl lg:text-4xl font-bold text-center p-4'>Your Quizzes</h1>
        <div className='max-w-sm mx-auto text-center p-4 flex flex-col gap-4'>
          <Button href='/editor/new' variant='green' className='font-semibold'>
            Create New Quiz
          </Button>
          <Button href='/quizzes/generate' variant='yellow' className='font-semibold'>
            Generate Quiz
          </Button>
          <QuizFileInput onChange={ onFile } className='w-full text-center' />
        </div>
        <div className='container mx-auto w-full grid gap-4 p-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
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