import EmailInput from '@/components/ui/email-input'
import FancyButton from '@/components/ui/fancy-button'
import FancyCard from '@/components/ui/fancy-card'
import PasswordInput from '@/components/ui/password-input'
import React from 'react'

const SignInPage = () => {
  return (
    <FancyCard className='py-4'>
      <form 
        action="" 
        className='flex flex-col gap-4 text-center'
      >
        <div>
          <h1 className='text-2xl font-semibold'>Sign In</h1>
          <p>Sign in to your account</p>
        </div>
        <EmailInput color='ghost' placeholder='Email' />
        <PasswordInput color='ghost' placeholder='Password' />
        <FancyButton size='sm' color='green'>
          Sign In
        </FancyButton>
      </form>
    </FancyCard>
  )
}

export default SignInPage