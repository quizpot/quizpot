import Footer from '@/components/nav/Footer'
import { FancyIcons } from '@/components/ui/fancy-icons'
import React from 'react'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='h-dvh w-full flex flex-col md:items-center md:justify-center'>
      <FancyIcons />
      { children }
      <Footer className='absolute bottom-0 w-full left-0' color='darkgray' />
    </main>
  )
}

export default AuthLayout