"use client"
import Image from 'next/image'
import React from 'react'

const QuestionImage = ({ src }: { src: string | undefined }) => {
  if (!src) {
    return null
  }

  return (
    <section className='flex items-center justify-center h-full w-full'>
      <div className='w-full h-full flex flex-col items-center justify-center gap-4'>
        <div className='relative w-full h-full'>
          <Image
            alt='Question Image'
            src={ src }
            fill={ true }
            className='object-contain'
          />
        </div>
      </div>
    </section>
  )
}

export default QuestionImage