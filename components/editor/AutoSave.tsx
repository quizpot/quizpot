"use client"
import React, { useEffect } from 'react'
import { useEditorQuizFile } from './providers/EditorQuizFileProvider'
import { useToast } from '../ui/toaster'
import { saveQuiz } from '@/lib/client/IndexedDB'

const AutoSave = ({ quizId }: { quizId: string }) => {
  const toast = useToast()
  const { quizFile: quiz } = useEditorQuizFile()

  useEffect(() => {
    const autoSaveHandler = setTimeout(async () => {
      if (quizId && quizId !== 'new' && quiz) {
        try {
          await saveQuiz(quiz, quizId)
          toast('Quiz automatically saved', { variant: 'success' })
        } catch (error) {
          toast('Error saving quiz automatically', { variant: 'error' })
          console.error(error)
        }
      }
    }, 3000)

    return () => {
      clearTimeout(autoSaveHandler)
    }
  }, [quiz, quizId, toast])

  return <></>
}

export default AutoSave