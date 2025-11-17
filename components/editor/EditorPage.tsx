"use client"
import React, { useEffect } from "react"
import { useToast } from "../ui/toaster"
import { redirect } from "next/navigation"
import EditorHeader from "./header/EditorHeader"
import EditorLeftBar from "./leftbar/EditorLeftBar"
import QuestionEditor from "./question/QuestionEditor"
import { useEditorQuizFile } from "./providers/EditorQuizFileProvider"
import { getQuiz } from "@/lib/client/IndexedDB"
import SlideArrowKeybind from "./keybinds/SlideArrowKeybind"
import AutoSave from "./AutoSave"

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
          <EditorLeftBar />
          <QuestionEditor />
        </section>
      </main>
    </>
  )
}