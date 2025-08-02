import Link from 'next/link'
import React from 'react'

const Hero = () => {
  return (
    <section className='w-full h-[80vh]'>
      <div className='container w-full h-full mx-auto flex flex-col items-center justify-center gap-4'>
        <h1 className='text-center font-semibold text-6xl'>Quizpot</h1>
        <p>A pot for all of your quizzes!</p>
        <div className='flex gap-8'>
          <Link href={'/editor'}>
            Editor
          </Link>
          <Link href={'/host'}>
            Host
          </Link>
          <Link href={'/play'}>
            Play
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Hero