import React from 'react'
import Button from '../ui/Button'

const Footer = () => {
  return (
    <footer className='text-center p-4 flex items-center justify-center'>
      <Button href='https://github.com/quizpot' variant='secondary' className='mx-auto'>
        2025 © Quizpot
      </Button>
    </footer>
  )
}

export default Footer