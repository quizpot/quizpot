"use client"
import ColorInput from '@/components/ui/ColorInput'
import FancyButton from '@/components/ui/fancy-button'
import InputLabel from '@/components/ui/input-label'
import TextInput from '@/components/ui/text-input'
import { useToast } from '@/components/ui/toaster'
import React, { useState } from 'react'
import { authClient } from '@/lib/auth-client'
import PasswordInput from '@/components/ui/password-input'
import { useRouter } from 'next/navigation'
import FancyCard from '@/components/ui/fancy-card'

const ProfilePageClient = ({ session }: { session: any }) => {
  const toast = useToast()
  const router = useRouter()
  const [name, setName] = useState(session?.user?.name || '')
  const [email, setEmail] = useState(session?.user?.email || '')
  const [icon, setIcon] = useState(session?.user?.icon || '')
  const [color, setColor] = useState(session?.user?.color || '#000000')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // 1. Check for Name or Color updates
      if (name !== session?.user?.name || color !== session?.user?.color) {
        const { error } = await authClient.updateUser({
          name,
        })
        if (error) throw new Error(error.message || 'Failed to update profile info')
      }

      // 2. Check for Email updates
      if (email !== session?.user?.email) {
        const { error } = await authClient.changeEmail({
          newEmail: email,
          callbackURL: '/dashboard/profile'
        })
        if (error) throw new Error(error.message || 'Failed to change email')
      }

      // 3. Check for Password updates
      if (newPassword) {
        if (!currentPassword) {
          throw new Error('Current password is required to set a new password')
        }
        
        const { error } = await authClient.changePassword({
          currentPassword: currentPassword,
          newPassword: newPassword,
          revokeOtherSessions: true
        })
        
        if (error) throw new Error(error.message || 'Failed to change password')
        
        setCurrentPassword('')
        setNewPassword('')
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
      <FancyCard>
        <h1 className='text-4xl font-semibold'>Profile</h1> 
      </FancyCard>
      <FancyCard className='p-4 pb-6 flex flex-col gap-6'>
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
            <InputLabel label='Email' className='text-center' />
            <TextInput 
              value={ email } 
              onChange={ (e) => setEmail(e.target.value) } 
              placeholder='Enter email' 
            />
          </div>
          <div className='flex flex-col gap-4'>
            <InputLabel label='Icon' className='text-center' />
            <TextInput 
              value={ icon } 
              onChange={ (e) => setIcon(e.target.value) } 
              placeholder='Icon URL' 
            />
          </div>
          <div className='flex flex-col gap-4'>
            <InputLabel label='Color' className='text-center' />
            <ColorInput 
              value={ color } 
              onChange={ (val) => setColor(val) } 
            />
          </div>
          <div className='flex flex-col gap-4'>
            <InputLabel label='Current Password' className='text-center' />
            <PasswordInput
              value={ currentPassword } 
              onChange={ (e) => setCurrentPassword(e.target.value) } 
              placeholder='Current password' 
            />
          </div>
          <div className='flex flex-col gap-4'>
            <InputLabel label='New Password' className='text-center' />
            <PasswordInput
              value={ newPassword } 
              onChange={ (e) => setNewPassword(e.target.value) } 
              placeholder='Enter new password' 
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

export default ProfilePageClient