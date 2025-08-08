"use client"
import Button from '@/components/ui/Button'
import { redirect } from 'next/navigation'
import React from 'react'

const MessagePage = () => {
  const messageTitle = sessionStorage.getItem('messageTitle')
  const messageDescription = sessionStorage.getItem('messageDescription')

  if (!messageTitle || !messageDescription) {
    sessionStorage.removeItem('messageTitle')
    sessionStorage.removeItem('messageDescription')
    redirect('/')
  }

  return (
    <div className='flex flex-col items-center justify-center gap-4 h-screen w-full p-4'>
      <h1 className='text-2xl font-semibold'>Message - { messageTitle }</h1>
      <p className='text-center max-w-md'>{ messageDescription }</p>
      <Button href='/' variant='gray'>
        Home
      </Button>
    </div>
  )
}

export default MessagePage