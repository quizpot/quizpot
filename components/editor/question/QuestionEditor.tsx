"use client"
import React, { useEffect } from 'react'
import { getBackgroundStyles } from '@/lib/client/BackgroundStyles'
import Button from '@/components/ui/Button'
import MultipleChoiceEditor from './editors/multipleChoice/MultipleChoiceEditor'
import TrueFalseEditor from './editors/trueFalse/TrueFalseEditor'
import { useEditorQuizFile } from '../providers/EditorQuizFileProvider'
import { useEditorCurrentQuestion } from '../providers/EditorCurrentQuestionProvider'
import SlideEditor from './editors/slide/SlideEditor'
import ShortAnswerEditor from './editors/shortAnswer/ShortAnswerEditor'

const QuestionEditor = () => {
  const { quizFile } = useEditorQuizFile()
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
      <section className='h-[calc(100vh-144px-128px)] md:h-[calc(100vh-58px)] w-full overflow-hidden'>
        <div className='h-full w-full flex flex-col justify-between p-4' style={ getBackgroundStyles(quizFile.theme.background) }>
          <Button variant='gray' className='text-2xl w-full text-center'>
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
    return <TrueFalseEditor />
  }

  if (currentQuestion.questionType === 'slide') {
    return <SlideEditor />
  }

  if (currentQuestion.questionType === 'shortAnswer') {
    return <ShortAnswerEditor />
  }

  return (
    <section className='h-[calc(100vh-58px)] w-full overflow-hidden'>
      <div className='h-full w-full flex flex-col items-center justify-center p-4' style={ getBackgroundStyles(quizFile.theme.background) }>
        <Button variant='gray' className='text-2xl w-full text-center'>
          Unsupported question type: <span className='font-semibold'>{ currentQuestion.questionType }</span>
        </Button>
      </div>
    </section>
  )
}

export default QuestionEditor