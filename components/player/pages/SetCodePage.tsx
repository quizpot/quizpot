"use client"
import React from 'react'
import NumberInput from '../../ui/number-input'
import { useTranslations } from 'next-intl'
import FancyButton from '@/components/ui/fancy-button'
import Link from 'next/link'

const SetCodePage = () => {
  const t = useTranslations('PlayPage')

  const [code, setCode] = React.useState<number>(0)

  return (
    <section className='flex flex-col gap-4 items-center justify-center h-screen w-full p-4'>
      <h1 className='text-2xl font-semibold'>{ t('title') }</h1>
      <div className='max-w-md'>
        <NumberInput onChange={(e) => {
          const value = e.target.value
          if (value === '') {
            setCode(0)
          } else {
            setCode(parseInt(e.target.value))
          }
        }} value={ code } />
      </div>
      <FancyButton color='green' asChild>
        <Link href={'./play?code=' + code}>
          { t('continue') }
        </Link>
      </FancyButton>
    </section>
  )
}

export default SetCodePage