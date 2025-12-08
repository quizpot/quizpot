"use client"
import React, { useEffect } from 'react'
import { useTranslations } from 'next-intl'
import FancyButton from '@/components/ui/fancy-button'
import Link from 'next/link'
import Header from '@/components/nav/Header'
import TextInput from '@/components/ui/TextInput'

const SetCodePage = () => {
  const t = useTranslations('PlayPage')

  const [code, setCode] = React.useState<string>('')

  useEffect(() => {
    const submit = () => {
      window.location.href = '/play?code=' + code
    }

    window.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        submit()
      }
    })

    return () => {
      window.removeEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          submit()
        }
      })
    }
  }, [code])

  return (
    <>
      <Header />
      <section className='flex flex-col gap-4 items-center justify-center h-screen w-full p-4'>
        <h1 className='text-2xl font-semibold'>{ t('title') }</h1>
        <div className='max-w-md'>
          <TextInput 
            onChange={(e) => {
              const value = e.target.value
              const isOnlyDigits = /^\d{0,6}$/.test(value)

              if (isOnlyDigits) {
                setCode(value)
              }
            }}
          value={ code } />
        </div>
        <FancyButton color='green' asChild>
          <Link href={'./play?code=' + code}>
            { t('continue') }
          </Link>
        </FancyButton>
      </section>
    </>
  )
}

export default SetCodePage