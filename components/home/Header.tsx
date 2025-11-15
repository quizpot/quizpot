"use client"
import React, { useState } from 'react'
import Notification from './Notification'
import FancyButton from '../ui/fancy-button'
import Link from 'next/link'
import { ThemeSwitch } from '../ui/theme-switch'
import { createPortal } from 'react-dom'
import { Menu } from 'lucide-react'
import { useMessages } from 'next-intl'
import LocaleSwitch from '../ui/locale-switch'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)

  const menu: { label: string, href: string }[] = []
  const messages = useMessages()
  const keys = Object.keys(messages.Header)

  for (const key of keys) {
    menu.push({
      label: messages.Header[key].label,
      href: messages.Header[key].href
    })
  }

  return (
    <>
      <header className='fixed top-0 left-0 w-full z-10 bg-white/60 dark:bg-black/60 backdrop-blur-sm'>
        <Notification>
          This is an early version of Quizpot under active development. <b>Expect frequent changes.</b> Download quizzes as a file for long term storage.
        </Notification>
        <div className='container w-full mx-auto p-4 flex justify-between select-none'>
          <FancyButton asChild>
            <Link href={'/'} className='text-2xl font-semibold'>
              Quizpot
            </Link>
          </FancyButton>
          <div className='hidden md:flex gap-8 items-center justify-center text-lg'>
            {
              menu.map(({ href, label }, index) => (
                <FancyButton key={ index } size='sm' asChild>
                  <Link href={ href }>
                    { label }
                  </Link>
                </FancyButton>
              ))
            }
            <LocaleSwitch size='sm' align='end' />
            <ThemeSwitch />
          </div>
          <div className='flex md:hidden items-center justify-between'>
            <FancyButton className='block' onClick={ () => setIsOpen(true) }>
              <Menu size={ 20 } />
            </FancyButton>
          </div>
        </div>
      </header>
      { isOpen && <MobileMenu menu={ menu } setIsOpen={ setIsOpen } /> }
    </>
  )
}

const MobileMenu = ({ menu, setIsOpen }: { menu: { label: string, href: string }[], setIsOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
  return createPortal(
    <section 
      className='
        z-50 fixed left-0 top-0 h-screen w-full backdrop-blur-sm bg-white/80 dark:bg-black/80
        flex md:hidden flex-col items-center justify-center gap-4 p-4
      ' 
      onClick={ () => setIsOpen(false) }
    >
      {
        menu.map(({ href, label }, index) => (
          <FancyButton key={ index } className='w-full text-center text-2xl' asChild>
            <Link href={ href }>
              { label }
            </Link>
          </FancyButton>
        ))
      }
      <div className='flex items-center justify-center gap-4 mt-8 text-2xl'>
        <LocaleSwitch align='center' />
        <ThemeSwitch />
      </div>
    </section>
  , document.body)
}

export default Header