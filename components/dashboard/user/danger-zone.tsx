"use client"
import { useState } from 'react'
import FancyButton from "@/components/ui/fancy-button"
import FancyCard from "@/components/ui/fancy-card"
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/toaster'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import { useTranslations } from 'next-intl'

const UserDangerZone = () => {
  const toast = useToast()
  const router = useRouter()
  const t = useTranslations('UserDangerZone')
  const bt = useTranslations('Buttons')
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const onDelete = async () => {
    setIsLoading(true)
    try {
      const { error } = await authClient.deleteUser()
      if (error) throw new Error(error.message || 'Failed to delete account')

      toast(t('success'), { variant: 'success' })
      router.push('/')
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'An unexpected error occurred'
      toast(message, { variant: 'error' })
      setIsLoading(false)
    }
  }

  return (
    <FancyCard className='p-6 flex flex-col gap-4'>
      <h1 className='text-2xl font-semibold'>
        { t('title') }
      </h1>
      <p className='text-sm opacity-70'>
        { t('description') }
      </p>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger color='red'>
          { t('button') }
        </DialogTrigger>
        <DialogContent className='max-w-md'>
          <DialogHeader title={ t('dialogTitle') } />
          <div className='p-6 flex flex-col gap-6'>
            <p className='text-sm opacity-70'>
              { t('dialogDescription') }
            </p>

            <div className='flex flex-col gap-3'>
              <FancyButton
                color='red'
                onClick={ onDelete }
                disabled={ isLoading }
              >
                { isLoading ? t('deleting') : t('confirmButton') }
              </FancyButton>
              <FancyButton
                onClick={ () => setIsOpen(false) }
                disabled={ isLoading }
              >
                { bt('cancel') }
              </FancyButton>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </FancyCard>
  )
}

export default UserDangerZone