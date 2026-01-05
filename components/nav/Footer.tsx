import React from 'react'
import FancyButton from '../ui/fancy-button'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className='p-4 flex items-center justify-center select-none'>
      <FancyButton size='sm' asChild>
        <Link href='https://quizpot.app' target='_blank' className='text-sm'>
          2025 - { new Date().getFullYear() } © Quizpot
        </Link>
      </FancyButton>
    </footer>
  )
}

export default Footer