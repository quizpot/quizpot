"use client"
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
import { redirect } from 'next/navigation'

const SignUpPage = () => {
  const toast = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    const formData = new FormData(e.currentTarget)
    const obj = Object.fromEntries(formData.entries())

    const validation = signUpSchema.safeParse(obj)

    if (!validation.success) {
      toast(validation.error.message, { variant: 'error' })
      return
    }

    const { username, email, password, confirm } = validation.data

    if (password !== confirm) {
      toast('Passwords do not match', { variant: 'error' })
      return
    }

    const { error } = await authClient.signUp.email({
      name: username,
      email: email,
      password: password,
    })

    if (error) {
      toast(error.message || "Error creating account", { variant: 'error' })
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
          <h1 className='text-2xl font-semibold'>Sign Up</h1>
          <p>Sign up to this instance</p>
        </div>
        <InputLabel label='Username' />
        <TextInput color='ghost' name='username' placeholder='Username' required />
        <InputLabel label='Email' />
        <EmailInput color='ghost' name='email' placeholder='user@example.com' required />
        <InputLabel label='Password' />
        <PasswordInput color='ghost' name='password' placeholder='Password' required />
        <InputLabel label='Confirm Password' />
        <PasswordInput color='ghost' name='confirm' placeholder='Password' required />
        <FancyButton size='sm' color='green'>
          Sign Up
        </FancyButton>
        <p>or</p>
        <FancyButton size='sm' color='blue' asChild>
          <Link href={'/auth/signin/'}>
            Sign In
          </Link>
        </FancyButton>
      </form>
    </FancyCard>
  )
}

export default SignUpPage