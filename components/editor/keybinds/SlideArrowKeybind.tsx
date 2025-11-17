"use client"
import React, { useEffect } from 'react'
import { useEditorQuizFile } from '../providers/EditorQuizFileProvider'
import { useEditorCurrentQuestion } from '../providers/EditorCurrentQuestionProvider'

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

export default SlideArrowKeybind