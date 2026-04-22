"use client"
import React, { useState } from 'react'
import FancyButton from '../ui/fancy-button'
import Link from 'next/link'
import { ThemeSwitch } from '../ui/theme-switch'
import { createPortal } from 'react-dom'
import { Menu } from 'lucide-react'
import { _Translator, useMessages, useTranslations } from 'next-intl'
import LocaleSwitch from '../ui/locale-switch'
import { useRouter } from 'next/navigation'
import Notification from './Notification'
import { User } from 'better-auth'
import { signOut } from "@/lib/auth-client"

const HeaderClient = ({ user }: { user?: User }) => {
  const [isOpen, setIsOpen] = useState(false)
  const t = useTranslations()
  const router = useRouter()

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
      <header className='fixed top-0 left-0 w-full z-10 backdrop-blur-sm'>
        <Notification>
          This is an early version of Quizpot under active development. <b>Expect frequent changes.</b> Download quizzes as a file for long term storage.
        </Notification>
        <div className='container w-full mx-auto p-4 flex justify-between select-none'>
          <FancyButton color='background' asChild>
            <Link href={'/'} className='text-2xl font-semibold'>
              Quizpot
            </Link>
          </FancyButton>
          <div className='hidden md:flex gap-8 items-center justify-center text-lg'>
            {
              user ? (
                <>
                  <FancyButton color='background' size='sm' onClick={async () => {
                    await signOut()
                    router.refresh()
                  }}>
                    { t('Header.logout.label') }
                  </FancyButton>
                  <FancyButton color='background' size='sm' asChild>
                    <Link href="/dashboard">
                      { t('Header.dashboard.label') }
                    </Link>
                  </FancyButton>
                </>
              ) : (
                <FancyButton color='background' size='sm' asChild>
                  <Link href={ `/auth/signin` }>
                    { t('Header.login.label') }
                  </Link>
                </FancyButton>
              )
            }
            <LocaleSwitch color="background" size='sm' align='end' />
            <ThemeSwitch color='background' />
          </div>
          <div className='flex md:hidden items-center justify-between'>
            <FancyButton color='background' className='block' onClick={ () => setIsOpen(true) }>
              <Menu size={ 20 } />
            </FancyButton>
          </div>
        </div>
      </header>
      { isOpen && <MobileMenu router={ router } t={ t } user={ user } setIsOpen={ setIsOpen } /> }
    </>
  )
}

const MobileMenu = ({ user, t, setIsOpen, router }: { user?: User, t: _Translator, setIsOpen: React.Dispatch<React.SetStateAction<boolean>>, router: ReturnType<typeof useRouter> }) => {
  return createPortal(
    <section 
      className='
        z-50 fixed left-0 top-0 h-screen w-full backdrop-blur-sm bg-white/80 dark:bg-black/80
        flex md:hidden flex-col items-center justify-center gap-4 p-4
      ' 
      onClick={ () => setIsOpen(false) }
    >
      {
        user ? (
          <>
            <FancyButton className='w-full text-center text-2xl' onClick={async () => {
              await signOut()
              router.refresh()
              setIsOpen(false)
            }}>
              { t('Header.logout.label') }
            </FancyButton>
            <FancyButton className='w-full text-center text-2xl' asChild>
              <Link href="/dashboard" className='text-2xl'>
                { t('Header.dashboard.label') }
              </Link>
            </FancyButton>
          </>
        ) : (
          <FancyButton className='w-full text-center text-2xl' asChild>
            <Link href={ `/auth/signin` }>
              { t('Header.login.label') }
            </Link>
          </FancyButton>
        )
      }
      <LocaleSwitch className='w-full text-2xl' align='center' />
      <ThemeSwitch className='w-full items-center justify-center' />
    </section>
  , document.body)
}

export default HeaderClient