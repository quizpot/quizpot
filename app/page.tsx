import Footer from '@/components/nav/Footer'
import Header from '@/components/nav/Header'
import FancyButton from '@/components/ui/fancy-button'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import React from 'react'

const HomePage = () => {
  const t = useTranslations('HomePage')

  return (
    <section className='h-screen w-full flex flex-col justify-between'>
      <Header />
      <div className='h-32'></div>
      <section className='flex flex-col gap-8 items-center justify-center'>
        <FancyButton className='text-4xl lg:text-6xl font-semibold' size='lg'>
          Quizpot
        </FancyButton>
        <div className='flex gap-4 items-center justify-center'>
          <FancyButton color='red' className='text-2xl' asChild>
            <Link href={ t('menu.Edit.href') }>
              { t('menu.Edit.label') }
            </Link>
          </FancyButton>
          <FancyButton color='blue' className='text-2xl' asChild>
            <Link href={ t('menu.Host.href') }>
              { t('menu.Host.label') }
            </Link>
          </FancyButton>
          <FancyButton color='green' className='text-2xl' asChild>
            <Link href={ t('menu.Play.href') }>
              { t('menu.Play.label') }
            </Link>
          </FancyButton>
          <FancyButton color='yellow' className='text-2xl' asChild>
            <Link href={ t('menu.Stats.href') }>
              { t('menu.Stats.label') }
            </Link>
          </FancyButton>
        </div>
      </section>
      <Footer />
    </section>
  )
}


export default HomePage