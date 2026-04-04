import Footer from '@/components/nav/Footer'
import { HeroIcons } from '@/components/ui/hero-icons'
import React from 'react'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='h-dvh w-full flex flex-col md:items-center md:justify-center'>
      <HeroIcons />
      { children }
      <Footer className='absolute bottom-0 w-full left-0' color='ghost' />
    </main>
  )
}

export default AuthLayout