"use client"
import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './dropdown-menu'
import { useLocale, useMessages, useTranslations } from 'next-intl'
import { setCookie } from 'cookies-next'
import FancyButton from './fancy-button'
import { Color } from '@/lib/colors'

const LocaleSwitch = ({ className, color, align, size }: { className?: string, color?: Color, align?: 'end' | 'center' | 'start', size?: 'sm' | 'lg' }) => {
  const locale = useLocale()
  const t = useTranslations('Locales')
  const messages = useMessages()
  const localeKeys = Object.keys(messages.Locales)

  const changeLocale = (newLocale: string) => {
    setCookie('locale', newLocale)
    window.location.reload()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <FancyButton color={ color } className={ className } size={ size }>
          { t(`${locale}`) }
        </FancyButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent color={ color } align={ align || 'end' }>
        {
          localeKeys.map((key, index) => {
            return (
              <DropdownMenuItem key={ index } onClick={() => changeLocale(key)}>
                { t(`${key}`) }
              </DropdownMenuItem>
            )
          })
        }
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default LocaleSwitch