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

const ProfileEditor = ({ session }: { session: any }) => {
  const toast = useToast()
  const router = useRouter()
  const [name, setName] = useState(session?.user?.name || '')
  const [icon, setIcon] = useState(session?.user?.icon || '')
  const [color, setColor] = useState(session?.user?.color || '#000000')
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (name !== session?.user?.name || color !== session?.user?.color) {
        const { error } = await authClient.updateUser({
          name,
        })
        if (error) throw new Error(error.message || 'Failed to update profile info')
      }

      toast('Profile updated successfully!', { variant: 'success' })
    } catch (err: any) {
      toast(err.message || 'An unexpected error occurred', { variant: 'error' })
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
      <FancyCard className='p-4 pb-6 flex flex-col gap-6'>
        <FancyCard color='black'>
          <h1 className='text-2xl font-semibold'>Profile</h1> 
        </FancyCard>
        <div className='grid md:grid-cols-2 gap-x-4 gap-y-6'>
          <div className='flex flex-col gap-4'>
            <InputLabel label='Username' className='text-center' />
            <TextInput 
              value={ name } 
              onChange={ (e) => setName(e.target.value) } 
              placeholder='Enter username' 
            />
          </div>
          <div className='flex flex-col gap-4'>
            <InputLabel label='Icon' className='text-center' />
            <TextInput
              disabled={ true }
              value={ icon } 
              onChange={ (e) => setIcon(e.target.value) } 
              placeholder='Icon URL' 
            />
          </div>
          <div className='flex flex-col gap-4'>
            <InputLabel label='Color' className='text-center' />
            <ColorInput 
              disabled={ true}
              value={ color } 
              onChange={ (val) => setColor(val) } 
            />
          </div>
        </div>
        <FancyButton
          color='green' 
          className='w-full' 
          type="submit" 
          disabled={ isLoading }
        >
          { isLoading ? 'Updating ...' : 'Update' }
        </FancyButton>
      </FancyCard>
    </form>
  )
}

export default ProfileEditor