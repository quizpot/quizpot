import Header from '@/components/home/Header'
import FancyButton from '@/components/ui/fancy-button'
import { Color } from '@/lib/Colors'
import { cn } from '@/lib/utils'
import { Slot } from '@radix-ui/react-slot'
import { Cog, Gamepad, Pencil, PersonStanding } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import React from 'react'

const HomePage = () => {
  const t = useTranslations('HomePage')

  return (
    <section className='h-screen w-full flex flex-col justify-between'>
      <Header />
      <div className='h-32'></div>
      <section className='flex items-center justify-center'>
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 w-full container p-4'>
          <MenuButton color='red' href={ t('menu.Edit.href') } size='lg' icon={ <Pencil size={ 128 } /> }>
            { t('menu.Edit.label') }
          </MenuButton>
          <MenuButton color='green' href={ t('menu.Host.href') } size='lg' icon={ <PersonStanding size={ 128 } /> }>
            { t('menu.Host.label') }
          </MenuButton>
          <MenuButton color='blue' href={ t('menu.Play.href') } size='lg' icon={ <Gamepad size={ 128 } /> }>
            { t('menu.Play.label') }
          </MenuButton>
          <MenuButton color='orange' href={ t('menu.Stats.href') } size='lg' icon={ <Cog size={ 128 } /> }>
            { t('menu.Stats.label') }
          </MenuButton>
        </div>
      </section>
      <footer className='p-4 flex items-center justify-center'>
        <FancyButton size='sm' asChild>
          <Link href='https://quizpot.app' target='_blank' className='text-sm'>
            2025 © Quizpot
          </Link>
        </FancyButton>
      </footer>
    </section>
  )
}

const MenuButton = ({ 
  children, 
  color, 
  size, 
  className,
  icon,
  href
}: { 
  children: React.ReactNode, 
  color?: Color, 
  size?: 'sm' | 'lg', 
  className?: string,
  icon?: React.ReactNode,
  href: string
}) => {
  return (
    <FancyButton color={ color } size={ size } className={ 
      cn('w-full aspect-square flex flex-col gap-2 items-center justify-center relative overflow-hidden group text-4xl', className) 
    } asChild>
      <Link href={ href }>
        <Slot className='
          absolute opacity-20 
          top-[calc(50%-64px)] right-[calc(50%-64px)]
          group-hover:rotate-30 group-hover:scale-200
          group-active:top-[calc(100%)] group-active:right-[calc(100%)] group-active:rotate-0 group-active:scale-75
          duration-200
        '>
          { icon }
        </Slot> { children }
      </Link>
    </FancyButton>
  )
}


export default HomePage