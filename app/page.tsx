import Footer from '@/components/nav/Footer'
import Header from '@/components/nav/Header'
import FancyButton from '@/components/ui/fancy-button'
import { Cog, Pen, Play, User } from 'lucide-react'
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
        <div className='grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-6'>
          <FancyButton color='red' className='w-full flex items-center gap-4 my-auto p-6' asChild>
            <Link href={ t('menu.Edit.href') }>
              <Pen size={ 32 } />
              <div className='flex flex-col text-left justify-center'>
                <h1 className='text-2xl font-semibold'>{ t('menu.Edit.title') }</h1>
                <p>{ t('menu.Edit.subtitle') }</p>
              </div>
            </Link>
          </FancyButton>
          <FancyButton color='blue' className='w-full flex items-center gap-4 my-auto p-6' asChild>
            <Link href={ t('menu.Host.href') }>
              <User size={ 32 } />
              <div className='flex flex-col text-left justify-center'>
                <h1 className='text-2xl font-semibold'>{ t('menu.Host.title') }</h1>
                <p>{ t('menu.Host.subtitle') }</p>
              </div>
            </Link>
          </FancyButton>
          <FancyButton color='green' className='w-full flex items-center gap-4 my-auto p-6' asChild>
            <Link href={ t('menu.Play.href') }>
              <Play size={ 32 } />
              <div className='flex flex-col text-left justify-center'>
                <h1 className='text-2xl font-semibold'>{ t('menu.Play.title') }</h1>
                <p>{ t('menu.Play.subtitle') }</p>
              </div>
            </Link>
          </FancyButton>
          <FancyButton color='yellow' className='w-full flex items-center gap-4 my-auto p-6' asChild>
            <Link href={ t('menu.Stats.href') }>
              <Cog size={ 32 } />
              <div className='flex flex-col text-left justify-center'>
                <h1 className='text-2xl font-semibold'>{ t('menu.Stats.title') }</h1>
                <p>{ t('menu.Stats.subtitle') }</p>
              </div>
            </Link>
          </FancyButton>
        </div>
      </section>
      <Footer />
    </section>
  )
}

export default HomePage