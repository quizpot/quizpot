import Footer from '@/components/nav/Footer'
import Header from '@/components/nav/header'
import { FancyIcons } from '@/components/ui/fancy-icons'
import React from 'react'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='h-dvh w-full flex flex-col md:items-center md:justify-center'>
      <Header />
      <FancyIcons />
      { children }
      <Footer className='absolute bottom-0 w-full left-0' color='background' />
    </main>
  )
}

export default AuthLayout