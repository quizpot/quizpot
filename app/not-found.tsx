"use client"
import Footer from '@/components/nav/Footer'
import HeaderClientWrapper from '@/components/nav/header-client-wrapper'
import FancyButton from '@/components/ui/fancy-button'
import { FancyIcons } from '@/components/ui/fancy-icons'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

const NotFoundPage = () => {
  const t = useTranslations('NotFoundPage')
  const btn = useTranslations('Buttons')

  return (
    <>
      <HeaderClientWrapper />
      <FancyIcons />
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