import Button from '@/components/ui/Button'
import { TitleImageTextSlideLayout } from '@/lib/misc/QuizFile'
import Image from 'next/image'
import React from 'react'

const TitleImageTextSlide = ({ slide }: { slide: TitleImageTextSlideLayout }) => {
  return (
    <section className='h-full w-full flex flex-col items-center justify-center gap-4 p-4'>
      <Button variant='gray' className='text-center text-4xl font-semibold w-full py-4 px-4'>
        { slide.title }
      </Button>
      <div className='flex items-center justify-center p-4 w-full h-full'>
        {
          slide.image && (
            <section className='flex items-center justify-center h-full w-full'>
              <div className='w-full h-full flex flex-col items-center justify-center gap-4'>
                <div className='relative w-full h-full'>
                  <Image
                    alt='Slide Image'
                    src={ slide.image }
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
        { slide.text }
      </Button>
    </section>
  )
}

export default TitleImageTextSlide