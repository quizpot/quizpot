"use client"

import { useState } from 'react'
import EmailInput from '@/components/ui/email-input'
import FancyButton from '@/components/ui/fancy-button'
import FancyCard from '@/components/ui/fancy-card'
import InputLabel from '@/components/ui/input-label'
import PasswordInput from '@/components/ui/password-input'
import { useToast } from '@/components/ui/toaster'
import { authClient } from '@/lib/auth-client'
import { signInSchema } from '@/lib/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

const SignInPage = () => {
  const toast = useToast()
  const t = useTranslations('SignInPage')
  const router = useRouter()
  const [isPending, setIsPending] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    const formData = new FormData(e.currentTarget)
    const obj = Object.fromEntries(formData.entries())

    const validation = signInSchema.safeParse(obj)

    if (!validation.success) {
      toast(t('errorInvalid'), { variant: 'error' })
      return
    }

    const { email, password } = validation.data
    setIsPending(true)

    const { error } = await authClient.signIn.email({
      email: email,
      password: password,
    })

    if (error) {
      toast(error.message || t('errorGeneric'), { variant: 'error' })
      setIsPending(false)
      return
    }

    router.push('/dashboard')
  }

  return (
    <FancyCard 
      className='py-4 flex flex-col items-center justify-center rounded-none md:rounded-2xl h-dvh md:h-fit w-full md:max-w-sm' 
      color='background'
    >
      <form
        onSubmit={ handleSubmit }
        className='flex flex-col gap-4 w-full'
      >
        <div className='text-center'>
          <h1 className='text-2xl font-semibold'>{ t('title') }</h1>
          <p>{ t('subtitle') }</p>
        </div>
        <div className='flex flex-col gap-2'>
          <InputLabel label={ t('emailLabel') } />
          <EmailInput color='ghost' name='email' placeholder={ t('emailPlaceholder') } required disabled={isPending} />
        </div>
        <div className='flex flex-col gap-2 mb-1'>
          <InputLabel label={ t('passwordLabel') } />
          <PasswordInput color='ghost' name='password' placeholder={ t('passwordPlaceholder') } required disabled={isPending} />
        </div>
        
        <div className='flex flex-col gap-2'>
          <FancyButton size='sm' color='green' disabled={isPending}>
            {isPending ? t('signingIn') : t('button')}
          </FancyButton>
          
          <p className='text-center mt-1'>{ t('or') }</p>
          
          <FancyButton size='sm' color='blue' className='mb-2 text-center' asChild disabled={isPending}>
            <Link href={'/auth/signup/'}>
              { t('signUpLink') }
            </Link>
          </FancyButton>
        </div>
      </form>
    </FancyCard>
  )
}

export default SignInPage