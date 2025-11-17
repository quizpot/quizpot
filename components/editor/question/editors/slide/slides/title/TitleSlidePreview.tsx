import { useEditorCurrentQuestion } from '@/components/editor/providers/EditorCurrentQuestionProvider'
import { useEditorQuizFile } from '@/components/editor/providers/EditorQuizFileProvider'
import Button from '@/components/ui/ButtonOld'
import { SlideQuestion, TitleSlideLayout } from '@/lib/QuizFile'
import React from 'react'

const TitleSlidePreview = () => {
  const { quizFile } = useEditorQuizFile()
  const { currentQuestionIndex } = useEditorCurrentQuestion()
  const currentQuestion = quizFile.questions[currentQuestionIndex] as SlideQuestion
  const properties = currentQuestion.layout as TitleSlideLayout

  return (
    <section className='h-full w-full flex flex-col items-center justify-center gap-4 p-4'>
      <Button variant='gray' className='text-4xl px-4 py-4 text-center font-semibold mx-auto'>
        { properties.title }
      </Button>
      {
        properties.subtitle && (
          <Button variant='gray' className='text-xl text-center mx-auto'>
            { properties.subtitle }
          </Button>
        )
      }
    </section>
  )
}

export default TitleSlidePreview