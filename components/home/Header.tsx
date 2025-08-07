import React from 'react'
import Button from '../ui/Button'

const Header = () => {
  return (
    <header className='fixed top-0 left-0 w-full z-10 bg-white/50 backdrop-blur-sm'>
      <div className='container w-full mx-auto p-4 flex justify-between select-none'>
        <Button href={'/'} variant='secondary' className='text-2xl font-semibold'>
          Quizpot
        </Button>
        <div className='flex gap-8 items-center justify-center text-xl'>
          <Button href={'/stats'} variant='gray' className='text-lg font-semibold'>
            Stats
          </Button>
          <Button href={'https://github.com/quizpot'} variant='gray' className='text-lg font-semibold'>
            GitHub
          </Button>
        </div>
      </div>
    </header>
  )
}

export default Header