"use client"
import EditorHeader from '@/components/editor/header/EditorHeader'
import EditorLeftBar from '@/components/editor/leftbar/EditorLeftBar'
import { EditorCurrentQuestionContext } from '@/components/editor/providers/EditorCurrentQuestionContext'
import { EditorQuizFileContext } from '@/components/editor/providers/EditorQuizFileContext'
import QuestionEditor from '@/components/editor/question/QuestionEditor'
import { QuizFile } from '@/lib/QuizFile'
import React, { useEffect, useState } from 'react'

const EditorPage = () => {
  useEffect(() => {
    window.onbeforeunload = function() {
      return "Data will be lost if you leave the page, save your work!"
    }
  }, [])

  const [quizFile, setQuizFile] = useState<QuizFile>({
    version: 0,
    title: "Quiz Title",
    description: "This is a short description of the quiz.",
    language: "en",
    theme: {
      background: "#e5e5e5",
      color1: "#ff0000",
      color2: "#0000ff",
      color3: "#ffff00",
      color4: "#00ff00",
      color5: "#ff00ff",
      color6: "#770077"
    },
    questions: [
      {
        questionType: 'multipleChoice',
        question: "What is the color of the sky?",
        timeLimit: 30,
        points: 'normalPoints',
        choices: [
          {
            text: "Red",
            correct: false
          },
          {
            text: "Blue",
            correct: true
          },
          {
            text: "Yellow",
            correct: false
          },
          {
            text: "Green",
            correct: false
          }
        ]
      }
    ]
  })

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0)

  return (
    <EditorQuizFileContext.Provider value={{ quizFile, setQuizFile }}>
      <EditorCurrentQuestionContext.Provider value={{ currentQuestionIndex, setCurrentQuestionIndex }}>
        <main className='flex flex-col h-screen overflow-hidden'>
          <EditorHeader />
          <section className='flex h-[calc(100vh_-_56px)] overflow-hidden'>
            <EditorLeftBar />
            <QuestionEditor />
          </section>
        </main>
      </EditorCurrentQuestionContext.Provider>
    </EditorQuizFileContext.Provider>
  )
}

export default EditorPage