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
      <section className='flex flex-col gap-8 p-4 items-center justify-center'>
        <div className='h-96 lg:h-64 grid grid-cols-2 lg:grid-cols-4 gap-4 text-center'>
          <FancyButton color='red' className='text-2xl w-full h-full aspect-square flex items-center justify-center' asChild>
            <Link href={ t('menu.Edit.href') }>
              { t('menu.Edit.label') }
            </Link>
          </FancyButton>
          <FancyButton color='blue' className='text-2xl w-full h-full aspect-square flex items-center justify-center' asChild>
            <Link href={ t('menu.Host.href') }>
              { t('menu.Host.label') }
            </Link>
          </FancyButton>
          <FancyButton color='green' className='text-2xl w-full h-full aspect-square flex items-center justify-center' asChild>
            <Link href={ t('menu.Play.href') }>
              { t('menu.Play.label') }
            </Link>
          </FancyButton>
          <FancyButton color='yellow' className='text-2xl w-full h-full aspect-square flex items-center justify-center' asChild>
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