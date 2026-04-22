"use client"
import React, { useState } from 'react'
import FancyButton from "@/components/ui/fancy-button"
import FancyCard from "@/components/ui/fancy-card"
import InputLabel from "@/components/ui/input-label"
import PasswordInput from '@/components/ui/password-input'
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/toaster'

const PasswordEditor = () => {
  const toast = useToast()
  const router = useRouter()
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!newPassword) {
      toast('New password is required', { variant: 'error' })
      return
    }

    if (!currentPassword) {
      toast('Current password is required', { variant: 'error' })
      return
    }

    setIsLoading(true)

    try {
      const { error } = await authClient.changePassword({
        currentPassword: currentPassword,
        newPassword: newPassword,
        revokeOtherSessions: true
      })

      if (error) throw new Error(error.message || 'Failed to change password')

      toast('Password updated successfully!', { variant: 'success' })
      setCurrentPassword('')
      setNewPassword('')
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
          Security
        </h1>

        <div className='grid md:grid-cols-2 gap-x-6 gap-y-8'>
          <div className='flex flex-col gap-2'>
            <InputLabel label='Current Password' />
            <PasswordInput 
              value={ currentPassword } 
              onChange={ (e) => setCurrentPassword(e.target.value) } 
              placeholder='Enter current password' 
            />
          </div>

          <div className='flex flex-col gap-2'>
            <InputLabel label='New Password' />
            <PasswordInput
              value={ newPassword } 
              onChange={ (e) => setNewPassword(e.target.value) } 
              placeholder='Enter new password' 
            />
          </div>
        </div>

        <FancyButton
          color='blue'
          type="submit" 
          disabled={ isLoading }
        >
          { isLoading ? 'Updating ...' : 'Update Password' }
        </FancyButton>
      </FancyCard>
    </form>
  )
}

export default PasswordEditor