"use client"
import Button from '@/components/ui/ButtonOld'
import React from 'react'

const ErrorPage = ({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) => {
  return (
    <div className='flex flex-col items-center justify-center gap-4 h-screen w-full p-4'>
      <h1 className='text-2xl font-semibold'>000 - Error</h1>
      <p className='text-center max-w-md'>{ error.message }</p>
      <div className='flex gap-4 items-center justify-center'>
        <Button onClick={reset} variant='yellow'>
          Retry
        </Button>
        <p>or</p>
        <Button href='/' variant='red'>
          Go Home
        </Button>
      </div>
    </div>
  )
}

export default ErrorPage