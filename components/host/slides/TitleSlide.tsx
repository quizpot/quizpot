import Button from '@/components/ui/ButtonOld'
import { TitleSlideLayout } from '@/lib/misc/QuizFile'
import React from 'react'

const TitleSlide = ({ slide }: { slide: TitleSlideLayout }) => {
  return (
    <section className='h-full w-full flex flex-col items-center justify-center gap-4 p-4'>
      <Button variant='gray' className='text-4xl px-4 py-4 text-center font-semibold mx-auto'>
        { slide.title }
      </Button>
      {
        slide.subtitle && (
          <Button variant='gray' className='text-xl text-center mx-auto'>
            { slide.subtitle }
          </Button>
        )
      }
    </section>
  )
}

export default TitleSlide