import React from 'react'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='h-dvh w-full flex md:items-center md:justify-center'>
      { children }
    </main>
  )
}

export default AuthLayout