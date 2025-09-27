"use client"
import React, { useEffect } from "react"
import { useToast } from "../ui/Toaster"
import { redirect } from "next/navigation"
import EditorHeader from "./header/EditorHeader"
import EditorLeftBar from "./leftbar/EditorLeftBar"
import QuestionEditor from "./question/QuestionEditor"
import { useEditorQuizFile } from "./providers/EditorQuizFileProvider"
import { getQuiz, saveQuiz } from "@/lib/client/IndexedDB"

export const EditorPage = ({ quizId }: { quizId: string }) => {
  const addToast = useToast()
  const { quizFile: quiz, setQuizFile: setQuiz } = useEditorQuizFile()

  useEffect(() => {
    const loadQuiz = async () => {
      if (!quizId) {
        return redirect('/quizzes')
      }

      if (quizId === 'new') {
        return
      }

      try {
        const quizFile = await getQuiz(quizId)

        if (!quizFile) {
          addToast({ message: 'Quiz not found', type: 'error' })
          return redirect('/quizzes')
        }

        setQuiz(quizFile)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (ignored) {
        addToast({ message: 'Error loading quiz', type: 'error' })
        return redirect('/quizzes')
      }
    }

    loadQuiz()
  }, [addToast, quizId, setQuiz])

  useEffect(() => {
    const autoSaveHandler = setTimeout(async () => {
      if (quizId && quizId !== 'new' && quiz) {
        try {
          await saveQuiz(quiz, quizId)
          addToast({ message: 'Quiz automatically saved', type: 'success' })
        } catch (error) {
          addToast({ message: 'Error saving quiz automatically', type: 'error' })
          console.error(error)
        }
      }
    }, 3000)

    return () => {
      clearTimeout(autoSaveHandler)
    }
  }, [quiz, quizId, addToast])

  return (
    <>
      <main className='flex flex-col h-screen overflow-hidden'>
        <EditorHeader quizId={ quizId } />
        <section className='flex flex-row h-[calc(100vh_-_56px)] overflow-hidden'>
          <EditorLeftBar />
          <QuestionEditor />
        </section>
      </main>
    </>
  )
}