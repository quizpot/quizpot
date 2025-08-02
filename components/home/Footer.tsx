import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className='text-center p-4'>
      <Link href={'https://github.com/quizpot'}>
        2025 © Quizpot
      </Link>
    </footer>
  )
}

export default Footer