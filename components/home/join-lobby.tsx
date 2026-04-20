"use client"
import FancyCard from '../ui/fancy-card'
import FancyButton from '../ui/fancy-button'
import { useTranslations } from 'next-intl'
import Form from 'next/form'
import { InputOTP, InputOTPGroup, InputOTPSeparator } from '../ui/input-otp'
import { FancyOTPSlot } from '../ui/fancy-otp-slot'
import { REGEXP_ONLY_DIGITS } from 'input-otp'

const JoinLobby = () => {
  const t = useTranslations('JoinLobby')

  return (
    <FancyCard className='p-6 max-w-sm w-full'>
      <Form action='/play' className='flex flex-col items-center gap-4'>
        <InputOTP name='code' maxLength={6} pattern={ REGEXP_ONLY_DIGITS } className='flex gap-2 w-full'>
          <InputOTPGroup className='flex gap-2'>
            <FancyOTPSlot index={0} />
            <FancyOTPSlot index={1} />
            <FancyOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator className='mx-auto w-full' />
          <InputOTPGroup className='flex gap-2'>
            <FancyOTPSlot index={3} />
            <FancyOTPSlot index={4} />
            <FancyOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
        <FancyButton color='green' type='submit' className='w-full'>
          { t('button') }
        </FancyButton>
      </Form>
    </FancyCard>
  )
}

export default JoinLobby