import { useEditorCurrentQuestion } from '@/components/editor/providers/EditorCurrentQuestionProvider'
import { useEditorQuizFile } from '@/components/editor/providers/EditorQuizFileProvider'
import FancyCard from '@/components/ui/fancy-card'
import { SlideQuestion, TitleSlideLayout } from '@/lib/QuizFile'
import React from 'react'

const TitleSlidePreview = () => {
  const { quizFile } = useEditorQuizFile()
  const { currentQuestionIndex } = useEditorCurrentQuestion()
  const currentQuestion = quizFile.questions[currentQuestionIndex] as SlideQuestion
  const properties = currentQuestion.layout as TitleSlideLayout

  return (
    <section className='h-full w-full flex flex-col items-center justify-center gap-4 p-4'>
      <FancyCard color='white' className='text-4xl px-4 py-4 text-center font-semibold mx-auto'>
        { properties.title }
      </FancyCard>
      {
        properties.subtitle && (
          <FancyCard color='white' className='text-xl text-center mx-auto'>
            { properties.subtitle }
          </FancyCard>
        )
      }
    </section>
  )
}

export default TitleSlidePreview