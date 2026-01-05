import Footer from '@/components/nav/Footer'
import Header from '@/components/nav/Header'
import FancyButton from '@/components/ui/fancy-button'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import React from 'react'

const NotFoundPage = () => {
  const t = useTranslations('NotFoundPage')
  const btn = useTranslations('Buttons')

  return (
    <>
      <Header />
      <section className='flex flex-col items-center justify-center gap-4 h-dvh w-full p-4'>
        <h1 className='text-2xl font-semibold'>{ t('title') }</h1>
        <FancyButton color='gray' asChild>
          <Link href='/'>{ btn('home') }</Link>
        </FancyButton>
      </section>
      <Footer className='absolute bottom-4 w-full left-0' />
    </>
  )
}

export default NotFoundPage