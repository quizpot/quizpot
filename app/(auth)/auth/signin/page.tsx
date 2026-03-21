"use client"
import EmailInput from '@/components/ui/email-input'
import FancyButton from '@/components/ui/fancy-button'
import FancyCard from '@/components/ui/fancy-card'
import InputLabel from '@/components/ui/input-label'
import PasswordInput from '@/components/ui/password-input'
import { useToast } from '@/components/ui/toaster'
import { authClient } from '@/lib/auth-client'
import { signInSchema } from '@/lib/zod'
import Link from 'next/link'
import { redirect } from 'next/navigation'

const SignInPage = () => {
  const toast = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    const formData = new FormData(e.currentTarget)
    const obj = Object.fromEntries(formData.entries())

    const validation = signInSchema.safeParse(obj)

    if (!validation.success) {
      toast("Invalid credentials", { variant: 'error' })
      return
    }

    const { email, password } = validation.data

    const { error } = await authClient.signIn.email({
      email: email,
      password: password,
    })

    if (error) {
      toast(error.message || "Error signing in", { variant: 'error' })
      return
    }

    redirect('/dashboard')
  }

  return (
    <FancyCard className='py-4 flex flex-col items-center justify-center rounded-none md:rounded-2xl h-dvh md:h-fit w-full md:max-w-fit' color='gray'>
      <form
        action={() => {}}
        onSubmit={ handleSubmit }
        className='flex flex-col gap-4 text-center'
      >
        <div>
          <h1 className='text-2xl font-semibold'>Sign In</h1>
          <p>Sign in to your account</p>
        </div>
        <InputLabel label='Email' />
        <EmailInput color='ghost' name='email' placeholder='user@example.com' required />
        <InputLabel label='Password' />
        <PasswordInput color='ghost' name='password' placeholder='Password' required />
        <FancyButton size='sm' color='green'>
          Sign In
        </FancyButton>
        <p>or</p>
        <FancyButton size='sm' color='blue' asChild>
          <Link href={'/auth/signup/'}>
            Sign Up
          </Link>
        </FancyButton>
      </form>
    </FancyCard>
  )
}

export default SignInPage