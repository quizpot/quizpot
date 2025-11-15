import React from 'react'
import Notification from './Notification'
import FancyButton from '../ui/fancy-button'
import Link from 'next/link'
import { ThemeSwitch } from '../ui/theme-switch'

const Header = () => {
  return (
    <header className='fixed top-0 left-0 w-full z-10 bg-white/60 dark:bg-black/60 backdrop-blur-sm'>
      <Notification>
        This is an early version of Quizpot under active development. <b>Expect frequent changes.</b> Download quizzes as a file for long term storage.
      </Notification>
      <div className='container w-full mx-auto p-4 flex justify-between select-none'>
        <FancyButton asChild>
          <Link href={'/'} className='text-2xl font-semibold'>
            Quizpot
          </Link>
        </FancyButton>
        <div className='flex gap-8 items-center justify-center text-xl'>
          <FancyButton size='sm' asChild>
            <Link href={'/stats'} className='text-lg'>
              Stats
            </Link>
          </FancyButton>
          <FancyButton size='sm' asChild>
            <Link href={'https://github.com/quizpot'} className='text-lg'>
              GitHub
            </Link>
          </FancyButton>
          <ThemeSwitch />
        </div>
      </div>
    </header>
  )
}

export default Header