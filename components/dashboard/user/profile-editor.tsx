"use client"
import React, { useState } from 'react'
import ColorInput from "@/components/ui/ColorInput"
import FancyButton from "@/components/ui/fancy-button"
import FancyCard from "@/components/ui/fancy-card"
import InputLabel from "@/components/ui/input-label"
import TextInput from "@/components/ui/text-input"
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/toaster'
import { User } from '@/lib/session'

const ProfileEditor = ({ user }: { user: User }) => {
  const toast = useToast()
  const router = useRouter()
  const [name, setName] = useState(user.name || '')
  const [color, setColor] = useState(user.color || '#000000')
  const [icon, setIcon] = useState(user.icon || '')
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (name !== user.name || color !== user.color) {
        const { error } = await authClient.updateUser({
          name,
        })

        if (error) throw new Error(error.message || 'Failed to update profile info')
      }

      toast('Profile updated successfully!', { variant: 'success' })
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'An unexpected error occurred'
      toast(message, { variant: 'error' })
    } finally {
      setIsLoading(false)
      router.refresh()
    }
  }

  return (
    <form
      onSubmit={ onSubmit }
      className='h-full w-full flex flex-col gap-4'
    >
      <FancyCard className='p-6 flex flex-col gap-4'>
        <h1 className='text-2xl font-semibold'>
          Profile
        </h1>

        <div className='grid md:grid-cols-2 gap-x-6 gap-y-8'>
          <div className='flex flex-col gap-2'>
            <InputLabel label='Username' />
            <TextInput 
              value={ name } 
              onChange={ (e) => setName(e.target.value) } 
              placeholder='Enter username' 
            />
          </div>

          <div className='flex flex-col gap-2 opacity-60'>
            <InputLabel label='Icon (System)' />
            <TextInput
              disabled={ true }
              value={ icon } 
              placeholder='Icon URL' 
            />
          </div>

          <div className='flex flex-col gap-2'>
            <InputLabel label='Color' />
            <ColorInput 
              disabled={ true }
              value={ color } 
              onChange={ (e: any) => setColor(e.target.value) } 
            />
          </div>
        </div>

        <FancyButton
          color='green'
          type="submit" 
          disabled={ isLoading }
        >
          { isLoading ? 'Updating ...' : 'Update Profile' }
        </FancyButton>
      </FancyCard>
    </form>
  )
}

export default ProfileEditor