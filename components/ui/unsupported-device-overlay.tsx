import React from 'react'
import FancyButton from './fancy-button'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

const DeviceScreenUnsupported = () => {
  const t = useTranslations('UnsupportedSizePage')
  const btnT = useTranslations('Buttons')

  return (
    <section className='z-[9999] fixed left-0 top-0 flex lg:hidden bg-white dark:bg-neutral-950 flex-col items-center justify-center gap-4 h-screen w-full p-4'>
      <h1 className='text-2xl font-semibold'>{ t('title') }</h1>
      <p className='text-center max-w-md'>{ t('description') }</p>
      <FancyButton asChild>
        <Link href='/'>
          { btnT('home') }
        </Link>
      </FancyButton>
    </section>
  )
}

export default DeviceScreenUnsupported