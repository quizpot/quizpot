"use client"
import React, { useEffect } from "react"
import { useToast } from "../ui/Toaster"
import { redirect } from "next/navigation"
import Button from "../ui/Button"
import EditorHeader from "./header/EditorHeader"
import EditorLeftBar from "./leftbar/EditorLeftBar"
import QuestionEditor from "./question/QuestionEditor"
import { useEditorQuizFile } from "./providers/EditorQuizFileProvider"

export const EditorPage = ({ quizId }: { quizId: string }) => {
  const addToast = useToast()
  const { quizFile: quiz, setQuizFile: setQuiz } = useEditorQuizFile()

  useEffect(() => {
    if (!quizId) {
      return redirect('/quizzes')
    }

    if (quizId === 'new') {
      return
    }
    
    const quizObj = localStorage.getItem('quiz:' + quizId)

    if (!quizObj) {
      return redirect('/quizzes')
    }

    try {
      const quizFile = JSON.parse(quizObj)

      if (!quizFile) {
        return redirect('/quizzes')
      }

      setQuiz(quizFile)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (ignored) {
      addToast({ message: 'Invalid quiz file', type: 'error' })
      return redirect('/quizzes')
    }
  }, [addToast, quizId, setQuiz])

  useEffect(() => {
    const autoSaveHandler = setTimeout(() => {
      if (quizId && quizId !== 'new' && quiz) {
        localStorage.setItem('quiz:' + quizId, JSON.stringify(quiz))
        addToast({ message: 'Quiz automatically saved', type: 'success' })
      }
    }, 3000)

    return () => {
      clearTimeout(autoSaveHandler)
    }
  }, [quiz, quizId, addToast])

  return (
    <>
      <div className='lg:hidden flex flex-col items-center justify-center gap-4 h-screen w-full'>
        <h1 className='text-2xl'>Screen size not supported</h1>
        <Button href='/' variant='gray'>
          Home
        </Button>
      </div>
      <main className='hidden lg:block'>
        <main className='flex flex-col h-screen overflow-hidden'>
          <EditorHeader quizId={ quizId } />
          <section className='flex h-[calc(100vh_-_56px)] overflow-hidden'>
            <EditorLeftBar />
            <QuestionEditor />
          </section>
        </main>
      </main>
    </>
  )
}