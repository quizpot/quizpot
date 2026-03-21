import EmailInput from '@/components/ui/email-input'
import FancyButton from '@/components/ui/fancy-button'
import FancyCard from '@/components/ui/fancy-card'
import InputLabel from '@/components/ui/input-label'
import PasswordInput from '@/components/ui/password-input'
import Link from 'next/link'

const SignInPage = () => {
  return (
    <FancyCard className='py-4 flex items-center justify-center rounded-none md:rounded-2xl w-full md:max-w-fit' color='gray'>
      <form 
        action="" 
        className='flex flex-col gap-4 text-center'
      >
        <div>
          <h1 className='text-2xl font-semibold'>Sign In</h1>
          <p>Sign in to your account</p>
        </div>
        <InputLabel label='Email' />
        <EmailInput color='ghost' placeholder='user@example.com' required />
        <InputLabel label='Password' />
        <PasswordInput color='ghost' placeholder='Password' required />
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