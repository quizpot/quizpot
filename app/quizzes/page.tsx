"use client"
import { QuizFile } from '@/lib/misc/QuizFile'
import React, { useEffect } from 'react'

const QuizzesPage = () => {
  const [quizzes, setQuizzes] = React.useState<QuizFile[]>([])

  useEffect(() => {
    const loadedQuizzes: QuizFile[] = []

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)

      if (key && key.startsWith('quiz:')) {
        const quizData = localStorage.getItem(key)

        if (quizData) {
          try {
            const quiz = JSON.parse(quizData)
            loadedQuizzes.push(quiz)
          } catch (e) {
            console.error(`Failed to parse quiz data for key: ${key}`, e)
          }
        }
      }
    }

    setQuizzes(loadedQuizzes)
  }, [])

  return (
    <div>
      { quizzes.length }
    </div>
  )
}

export default QuizzesPage