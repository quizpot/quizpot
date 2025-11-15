import Header from '@/components/home/Header'
import FancyButton from '@/components/ui/fancy-button'
import { Color } from '@/lib/Colors'
import { cn } from '@/lib/utils'
import { Slot } from '@radix-ui/react-slot'
import { Cog, Gamepad, Pencil, PersonStanding } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const HomePage = () => {
  return (
    <>
      <section className='h-screen w-full flex flex-col justify-between'>
        <Header />
        <div className='h-32'></div>
        <section className='flex items-center justify-center'>
          <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 w-full container p-4'>
            <MenuButton color='red' size='lg' icon={ <Pencil size={ 128 } /> }>
              Editor
            </MenuButton>
            <MenuButton color='green' size='lg' icon={ <PersonStanding size={ 128 } /> }>
              Host
            </MenuButton>
            <MenuButton color='blue' size='lg' icon={ <Gamepad size={ 128 } /> }>
              Play
            </MenuButton>
            <MenuButton color='orange' size='lg' icon={ <Cog size={ 128 } /> }>
              Debug
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
    </>
  )
}

const MenuButton = ({ 
  children, 
  color, 
  size, 
  className,
  icon
}: { 
  children: React.ReactNode, 
  color?: Color, 
  size?: 'sm' | 'lg', 
  className?: string,
  icon?: React.ReactNode
}) => {
  return (
    <FancyButton color={ color } size={ size } className={ cn('w-full aspect-square flex flex-col gap-2 items-center justify-center relative overflow-hidden group text-4xl', className) }>
      <Slot className='
        absolute opacity-20 
        top-[calc(50%-64px)] right-[calc(50%-64px)]
        group-hover:top-8 group-hover:right-12 group-hover:rotate-12 group-hover:scale-150 
        group-active:top-[calc(100%)] group-active:right-[calc(100%)] group-active:rotate-0 group-active:scale-75
        duration-200
      '>
        { icon }
      </Slot> { children }
    </FancyButton>
  )
}


export default HomePage