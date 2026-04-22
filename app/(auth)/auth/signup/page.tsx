"use client"

import { useState } from 'react'
import EmailInput from '@/components/ui/email-input'
import FancyButton from '@/components/ui/fancy-button'
import FancyCard from '@/components/ui/fancy-card'
import InputLabel from '@/components/ui/input-label'
import PasswordInput from '@/components/ui/password-input'
import TextInput from '@/components/ui/text-input'
import { useToast } from '@/components/ui/toaster'
import { authClient } from '@/lib/auth-client'
import { signUpSchema } from '@/lib/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

const SignUpPage = () => {
  const toast = useToast()
  const t = useTranslations('SignUpPage')
  const router = useRouter()
  const [isPending, setIsPending] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    const formData = new FormData(e.currentTarget)
    const obj = Object.fromEntries(formData.entries())

    const validation = signUpSchema.safeParse(obj)

    if (!validation.success) {
      toast(t('errorCheckInput'), { variant: 'error' })
      return
    }

    const { username, email, password, confirm } = validation.data

    if (password !== confirm) {
      toast(t('errorPasswordsMatch'), { variant: 'error' })
      return
    }

    setIsPending(true)

    const { error } = await authClient.signUp.email({
      name: username,
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
      className='py-8 md:py-4 flex flex-col items-center justify-center rounded-none md:rounded-2xl h-dvh md:h-fit w-full md:max-w-fit' 
      color='background'
    >
      <form
        onSubmit={ handleSubmit } 
        className='flex flex-col gap-4'
      >
        <div className='text-center'>
          <h1 className='text-2xl font-semibold'>{ t('title') }</h1>
          <p>{ t('subtitle') }</p>
        </div>
        <div className='flex flex-col gap-2'>
          <InputLabel label={ t('usernameLabel') } />
          <TextInput color='ghost' name='username' placeholder={ t('usernamePlaceholder') } required disabled={isPending} />
        </div>
        <div className='flex flex-col gap-2'>
          <InputLabel label={ t('emailLabel') } />
          <EmailInput color='ghost' name='email' placeholder={ t('emailPlaceholder') } required disabled={isPending} />
        </div>
        <div className='flex flex-col gap-2'>
          <InputLabel label={ t('passwordLabel') } />
          <PasswordInput color='ghost' name='password' placeholder={ t('passwordPlaceholder') } required disabled={isPending} />
        </div>
        <div className='flex flex-col gap-2 mb-1'>
          <InputLabel label={ t('confirmPasswordLabel') } />
          <PasswordInput color='ghost' name='confirm' placeholder={ t('confirmPasswordPlaceholder') } required disabled={isPending} />
        </div>
        
        <div className='flex flex-col gap-2'>
          <FancyButton size='sm' color='green' disabled={isPending}>
            {isPending ? t('creatingAccount') : t('button')}
          </FancyButton>
          
          <p className='text-center mt-1'>{ t('or') }</p>
          
          <FancyButton size='sm' color='blue' className='mb-2 text-center' asChild disabled={isPending}>
            <Link href={'/auth/signin/'}>
              { t('signInLink') }
            </Link>
          </FancyButton>
        </div>
      </form>
    </FancyCard>
  )
}

export default SignUpPage