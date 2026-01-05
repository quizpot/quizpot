import React from 'react'
import FancyButton from '../ui/fancy-button'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const Footer = ({ className }: { className?: string }) => {
  return (
    <footer className={ cn('p-4 flex items-center justify-center select-none', className) }>
      <FancyButton size='sm' asChild>
        <Link href='https://quizpot.app' target='_blank' className='text-sm'>
          2025 - { new Date().getFullYear() } © Quizpot
        </Link>
      </FancyButton>
    </footer>
  )
}

export default Footer