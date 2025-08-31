"use client"
import { QuizFile } from "@/lib/misc/QuizFile"
import React, { useEffect } from "react"
import { useToast } from "../ui/Toaster"
import { defaultQuiz } from "@/lib/misc/DefaultQuiz"
import { redirect } from "next/navigation"
import Button from "../ui/Button"
import { EditorQuizFileContext } from "./providers/EditorQuizFileContext"
import { EditorCurrentQuestionContext } from "./providers/EditorCurrentQuestionContext"
import EditorHeader from "./header/EditorHeader"
import EditorLeftBar from "./leftbar/EditorLeftBar"
import QuestionEditor from "./question/QuestionEditor"

export const EditorPage = ({ quizId }: { quizId: string }) => {
  const [quiz, setQuiz] = React.useState<QuizFile>(defaultQuiz)
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState<number>(0)
  const addToast = useToast()

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
  }, [addToast, quizId])

  return (
    <>
      <div className='lg:hidden flex flex-col items-center justify-center gap-4 h-screen w-full'>
        <h1 className='text-2xl'>Screen size not yet supported</h1>
        <Button href='/' variant='secondary'>
          Home
        </Button>
      </div>
      <main className='hidden lg:block'>
        <EditorQuizFileContext.Provider value={{ quizFile: quiz, setQuizFile: setQuiz }}>
          <EditorCurrentQuestionContext.Provider value={{ currentQuestionIndex, setCurrentQuestionIndex }}>
            <main className='flex flex-col h-screen overflow-hidden'>
              <EditorHeader quizId={ quizId } />
              <section className='flex h-[calc(100vh_-_56px)] overflow-hidden'>
                <EditorLeftBar />
                <QuestionEditor />
              </section>
            </main>
          </EditorCurrentQuestionContext.Provider>
        </EditorQuizFileContext.Provider>
      </main>
    </>
  )
}