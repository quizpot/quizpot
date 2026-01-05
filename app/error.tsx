"use client"
import FancyButton from '@/components/ui/fancy-button'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import React from 'react'

const ErrorPage = ({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) => {
  const t = useTranslations('Buttons')

  return (
    <div className='flex flex-col items-center justify-center gap-4 h-dvh w-full p-4'>
      <h1 className='text-2xl font-semibold'>000 - Error</h1>
      <p className='text-center max-w-md'>{ error.message }</p>
      <div className='flex gap-4 items-center justify-center'>
        <FancyButton onClick={ reset } color='yellow'>
          { t('retry') }
        </FancyButton>
        <p>-</p>
        <FancyButton color='red' asChild>
          <Link href='/'>
            { t('goHome') }
          </Link>
        </FancyButton>
      </div>
    </div>
  )
}

export default ErrorPage