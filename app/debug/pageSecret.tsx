"use client"
import Footer from '@/components/nav/Footer'
import Header from '@/components/nav/Header'
import FancyButton from '@/components/ui/fancy-button'
import PasswordInput from '@/components/ui/password-input'
import { setCookie } from 'cookies-next'
import React from 'react'

const DebugPageSecret = () => {
  const [secret, setSecret] = React.useState('')

  const onSubmit = () => {
    setCookie('debug', secret)
    window.location.reload()
  }

  return (
    <>
      <Header />
      <section className='flex flex-col items-center justify-center gap-4 h-dvh w-full p-4'>
        <PasswordInput value={ secret } onChange={(e) => { setSecret(e.target.value) }} />
        <FancyButton onClick={ onSubmit }>Submit</FancyButton>
      </section>
      <Footer className='absolute bottom-4 w-full left-0' />
    </>
  )
}

export default DebugPageSecret