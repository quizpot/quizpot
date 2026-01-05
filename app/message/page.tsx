"use client"
import FancyButton from '@/components/ui/fancy-button'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const MessagePage = () => {
  const btn = useTranslations('Buttons')
  const [messageTitle, setMessageTitle] = useState<string | null>(null)
  const [messageDescription, setMessageDescription] = useState<string | null>(null)

  useEffect(() => {
    const mt = sessionStorage.getItem('messageTitle')
    const md = sessionStorage.getItem('messageDescription')

    if (!mt || !md) {
      sessionStorage.removeItem('messageTitle')
      sessionStorage.removeItem('messageDescription')
      redirect('/')
    }

    setMessageTitle(mt)
    setMessageDescription(md)
  }, [])

  if (!messageTitle || !messageDescription) {
    return null
  }

  return (
    <div className='flex flex-col items-center justify-center gap-4 h-screen w-full p-4'>
      <h1 className='text-2xl font-semibold'>Message - { messageTitle }</h1>
      <p className='text-center max-w-md'>{ messageDescription }</p>
      <FancyButton color='gray' asChild>
        <Link href='/'>
          { btn('home') }
        </Link>
      </FancyButton>
    </div>
  )
}

export default MessagePage