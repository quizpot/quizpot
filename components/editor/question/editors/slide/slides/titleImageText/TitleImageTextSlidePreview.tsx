import { useEditorCurrentQuestion } from '@/components/editor/providers/EditorCurrentQuestionProvider'
import { useEditorQuizFile } from '@/components/editor/providers/EditorQuizFileProvider'
import Button from '@/components/ui/ButtonOld'
import { SlideQuestion, TitleImageTextSlideLayout } from '@/lib/QuizFile'
import Image from 'next/image'
import React from 'react'

const TitleImageTextSlidePreview = () => {
  const { quizFile } = useEditorQuizFile()
  const { currentQuestionIndex } = useEditorCurrentQuestion()
  const currentQuestion = quizFile.questions[currentQuestionIndex] as SlideQuestion
  const properties = currentQuestion.layout as TitleImageTextSlideLayout

  return (
    <section className='h-full w-full flex flex-col items-center justify-center gap-4 p-4'>
      <Button variant='gray' className='text-center text-4xl font-semibold w-full py-4 px-4'>
        { properties.title }
      </Button>
      <div className='flex items-center justify-center p-4 w-full h-full'>
        {
          properties.image && (
            <section className='flex items-center justify-center h-full w-full'>
              <div className='w-full h-full flex flex-col items-center justify-center gap-4'>
                <div className='relative w-full h-full'>
                  <Image
                    alt='Slide Image'
                    src={ properties.image }
                    fill={ true }
                    className='object-contain'
                  />
                </div>
              </div>
            </section>
          )
        }
      </div>
      <Button variant='gray' className='text-xl w-full py-4 px-4'>
        { properties.text }
      </Button>
    </section>
  )
}

export default TitleImageTextSlidePreview