import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <header className='fixed top-0 left-0 w-full z-10 bg-white/50 backdrop-blur-sm'>
      <div className='container w-full mx-auto p-4 flex justify-between select-none'>
        <Link href={'/'} className='text-2xl font-semibold'>Quizpot</Link>
        <div className='flex gap-8 items-center justify-center text-xl'>
          <Link href={'/editor'}>
            Editor
          </Link>
          <Link href={'/host'}>
            Host
          </Link>
          <Link href={'/quiz'}>
            Play
          </Link>
          <Link href={'/stats'}>
            Stats
          </Link>
          <Link href={'https://github.com/quizpot'}>
            GitHub
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header