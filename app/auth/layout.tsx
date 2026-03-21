import { HeroIcons } from '@/components/ui/hero-icons'
import React from 'react'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='h-dvh w-full flex md:items-center md:justify-center'>
      <HeroIcons />
      { children }
    </main>
  )
}

export default AuthLayout