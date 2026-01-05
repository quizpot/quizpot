"use client"
import React, { useEffect } from 'react'
import { getBackgroundStyles } from '@/lib/client/BackgroundStyles'
import MultipleChoiceEditor from './editors/multipleChoice/MultipleChoiceEditor'
import TrueFalseEditor from './editors/trueFalse/TrueFalseEditor'
import { useEditorQuizFile } from '../providers/EditorQuizFileProvider'
import { useEditorCurrentQuestion } from '../providers/EditorCurrentQuestionProvider'
import SlideEditor from './editors/slide/SlideEditor'
import ShortAnswerEditor from './editors/shortAnswer/ShortAnswerEditor'
import { QuizFile } from '@/lib/QuizFile'
import FancyButton from '@/components/ui/fancy-button'

const Editor = () => {
  const { quizFile } = useEditorQuizFile()
  const { currentQuestionIndex, setCurrentQuestionIndex } = useEditorCurrentQuestion()
  const currentQuestion = quizFile.questions[currentQuestionIndex]

  // Guardrail against going out of bounds on question delete
  useEffect(() => {
    if (currentQuestionIndex >= quizFile.questions.length) {
      const newIndex = Math.max(0, quizFile.questions.length - 1)
      setCurrentQuestionIndex(newIndex)
    }
  }, [quizFile.questions.length, currentQuestionIndex, setCurrentQuestionIndex])

  if (!currentQuestion) return <NoQuestion quizFile={ quizFile } />

  if (currentQuestion.questionType === 'multipleChoice') {
    return <MultipleChoiceEditor question={ currentQuestion } />
  }

  if (currentQuestion.questionType === 'trueFalse') {
    return <TrueFalseEditor />
  }

  if (currentQuestion.questionType === 'shortAnswer') {
    return <ShortAnswerEditor question={ currentQuestion } />
  }

  if (currentQuestion.questionType === 'slide') {
    return <SlideEditor />
  }

  return (
    <section className='h-[calc(100vh-60px)] w-full overflow-hidden'>
      <div className='h-full w-full flex flex-col items-center justify-center p-4' style={ getBackgroundStyles(quizFile.theme.background) }>
        <FancyButton className='text-2xl w-full text-center'>
          {/** @ts-expect-error may contain unknown type */}
          Unsupported question type: <span className='font-semibold'>{ currentQuestion.questionType }</span>
        </FancyButton>
      </div>
    </section>
  )
}

const NoQuestion = ({ quizFile }: { quizFile: QuizFile }) => {
  return (
    <section className='h-[calc(100vh-60px)] w-full overflow-hidden'>
      <div className='h-full w-full flex flex-col justify-between p-4' style={ getBackgroundStyles(quizFile.theme.background) }>
        <FancyButton className='text-2xl w-full text-center'>
          No questions found... Add one.
        </FancyButton>
      </div>
    </section>
  )
}


export default Editor