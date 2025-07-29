"use client"
import { useToast } from '@/components/ui/Toaster'
import Link from 'next/link'
import React from 'react'

const HomePage = () => {
  const addToast = useToast()
  return (
    <>
      <section>
        <Link href="/editor" className='p-4'>
          Editor
        </Link>
        <Link href="/host" className='p-4'>
          Host
        </Link>
        <Link href="/quiz" className='p-4'>
          Quiz
        </Link>
        <Link href="/stats" className='p-4'>
          Stats
        </Link>
        <button className='p-4' onClick={() => {
          addToast({ message: 'Logged out', type: 'error' })
        }}>
          Logout
        </button>
      </section>
    </>
  )
}

export default HomePage