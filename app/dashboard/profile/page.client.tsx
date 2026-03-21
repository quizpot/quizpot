"use client"
import ColorInput from '@/components/ui/ColorInput'
import FancyButton from '@/components/ui/fancy-button'
import InputLabel from '@/components/ui/input-label'
import TextInput from '@/components/ui/text-input'
import { useToast } from '@/components/ui/toaster'
import React from 'react'

const ProfilePageClient = ({ session }: { session: any }) => {
  const toast = useToast()
  
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    toast('Updating profile', { variant: 'info' })
  }

  return (
    <form
      action={ () => {} }
      onSubmit={ onSubmit }
      className='h-full w-full flex flex-col gap-4'
    >
      <h1 className='text-4xl font-semibold'>Profile</h1>
      <div className='grid md:grid-cols-2 gap-4'>
        <div className='flex flex-col gap-4'>
          <InputLabel label='Username' className='text-center' />
          <TextInput placeholder={ session?.user.name } />
        </div>
        <div className='flex flex-col gap-4'>
          <InputLabel label='Email' className='text-center' />
          <TextInput placeholder={ session?.user.email } />
        </div>
        <div className='flex flex-col gap-4'>
          <InputLabel label='Icon' className='text-center' />
          <TextInput placeholder={ session?.user.icon } />
        </div>
        <div className='flex flex-col gap-4'>
          <InputLabel label='Color' className='text-center' />
          <ColorInput value={ session?.user.color } />
        </div>
      </div>
      <FancyButton color='green' className='w-full'>
        Update
      </FancyButton>
    </form>
  )
}

export default ProfilePageClient