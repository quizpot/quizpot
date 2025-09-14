import React from 'react'
import Button from '../ui/Button'
import DebugButton from '../ui/DebugButton'

const Hero = () => {
  const dev = process.env.NODE_ENV === 'development'

  return (
    <section className='w-full h-[80vh]'>
      <div className='container w-full h-full mx-auto flex flex-col items-center justify-center gap-4'>
        <Button variant='gray' className='text-center font-semibold text-6xl py-4 px-6'>
          Quizpot
        </Button>
        <p>A pot for all of your quizzes!</p>
        <div className='flex gap-8'>
          <Button href={'/editor'} variant='red' className='text-lg font-semibold'>
            Editor
          </Button>
          <Button href={'/host'} variant='yellow' className='text-lg font-semibold'>
            Host
          </Button>
          <Button href={'/play'} variant='green' className='text-lg font-semibold'>
            Play
          </Button>
          { dev && <DebugButton /> }
        </div>
      </div>
    </section>
  )
}

export default Hero