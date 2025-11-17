"use client"
import React, { useEffect } from "react"
import { useToast } from "../ui/toaster"
import { redirect } from "next/navigation"
import EditorHeader from "./header/EditorHeader"
import { useEditorQuizFile } from "./providers/EditorQuizFileProvider"
import { getQuiz, saveQuiz } from "@/lib/client/IndexedDB"
import { useEditorCurrentQuestion } from "./providers/EditorCurrentQuestionProvider"
import Editor from "./question/Editor"
import EditorNavigation from "./leftbar/EditorNavigation"

export const EditorPage = ({ quizId }: { quizId: string }) => {
  const toast = useToast() 
  const { setQuizFile: setQuiz } = useEditorQuizFile()

  useEffect(() => {
    const loadQuiz = async () => {
      if (!quizId) return redirect('/quizzes')
      if (quizId === 'new') return

      try {
        const quizFile = await getQuiz(quizId)

        if (!quizFile) {
          toast('Quiz not found', { variant: 'error' })
          return redirect('/quizzes')
        }

        setQuiz(quizFile)
      } catch {
        toast('Error loading quiz', { variant: 'error' })
        return redirect('/quizzes')
      }
    }

    loadQuiz()
  }, [toast, quizId, setQuiz])

  return (
    <>
      <AutoSave quizId={ quizId } />
      <SlideArrowKeybind />
      <main className='flex flex-col h-screen overflow-hidden'>
        <EditorHeader quizId={ quizId } />
        <section className='flex flex-row h-[calc(100vh_-_56px)] overflow-hidden'>
          <EditorNavigation />
          <Editor />
        </section>
      </main>
    </>
  )
}

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

const SlideArrowKeybind = () => {
  const { quizFile } = useEditorQuizFile()
  const { currentQuestionIndex, setCurrentQuestionIndex } = useEditorCurrentQuestion()

  useEffect(() => {
    const handleUp = (e: KeyboardEvent) => {
      if (e.key !== 'ArrowUp') return
      if (currentQuestionIndex > 0) setCurrentQuestionIndex(currentQuestionIndex - 1)
    }

    const handleDown = (e: KeyboardEvent) => {
      if (e.key !== 'ArrowDown') return
      if (currentQuestionIndex < quizFile.questions.length - 1) setCurrentQuestionIndex(currentQuestionIndex + 1)
    }

    document.addEventListener('keydown', handleUp)
    document.addEventListener('keydown', handleDown)

    return () => {
      document.removeEventListener('keydown', handleUp)
      document.removeEventListener('keydown', handleDown)
    }
  }, [currentQuestionIndex, quizFile.questions.length, setCurrentQuestionIndex])

  return <></>
}