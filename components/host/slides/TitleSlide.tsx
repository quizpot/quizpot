import FancyButton from '@/components/ui/fancy-button'
import { TitleSlideLayout } from '@/lib/QuizFile'
import React from 'react'

const TitleSlide = ({ slide }: { slide: TitleSlideLayout }) => {
  return (
    <section className='h-full w-full flex flex-col items-center justify-center gap-4 p-4'>
      <FancyButton color='white' className='text-4xl px-4 py-4 text-center font-semibold mx-auto'>
        { slide.title }
      </FancyButton>
      {
        slide.subtitle && (
          <FancyButton color='white' className='text-xl text-center mx-auto'>
            { slide.subtitle }
          </FancyButton>
        )
      }
    </section>
  )
}

export default TitleSlide