"use client"
import React, { useEffect } from 'react'
import { getBackgroundStyles } from '@/lib/misc/BackgroundStyles'
import Button from '@/components/ui/Button'
import MultipleChoiceEditor from './editors/multipleChoice/MultipleChoiceEditor'
import TrueFalseEditor from './editors/trueFalse/TrueFalseEditor'
import { useEditorQuizFile } from '../providers/EditorQuizFileProvider'
import { useEditorCurrentQuestion } from '../providers/EditorCurrentQuestionProvider'

const QuestionEditor = () => {
  const { quizFile, setQuizFile } = useEditorQuizFile()
  const { currentQuestionIndex, setCurrentQuestionIndex } = useEditorCurrentQuestion()
  const currentQuestion = quizFile.questions[currentQuestionIndex]

  useEffect(() => {
    if (currentQuestionIndex >= quizFile.questions.length) {
      const newIndex = Math.max(0, quizFile.questions.length - 1)
      setCurrentQuestionIndex(newIndex)
    }
  }, [quizFile.questions.length, currentQuestionIndex, setCurrentQuestionIndex])

  if (!currentQuestion) {
    return (
      <section className='h-[calc(100vh-58px)] w-full overflow-hidden'>
        <div className='h-full w-full flex flex-col justify-between' style={ getBackgroundStyles(quizFile.theme.background) }>
          <Button variant='gray' className='text-2xl w-full'>
            No questions found, add one.
          </Button>
        </div>
      </section>
    )
  }

  if (currentQuestion.questionType === 'multipleChoice') {
    return <MultipleChoiceEditor />
  }

  if (currentQuestion.questionType === 'trueFalse') {
    return <TrueFalseEditor
      currentQuestion={ currentQuestion } 
      currentQuestionIndex={ currentQuestionIndex } 
      quizFile={ quizFile } 
      setQuizFile={ setQuizFile } 
    />
  }

  return (
    <section className='h-[calc(100vh-58px)] w-full overflow-hidden'>
      <div className='h-full w-full flex flex-col items-center justify-center' style={ getBackgroundStyles(quizFile.theme.background) }>
        <Button variant='gray' className='text-2xl w-full'>
          Unsupported question type: <span className='font-semibold'>{ currentQuestion.questionType }</span>
        </Button>
      </div>
    </section>
  )
}

export default QuestionEditor