"use client"
import React, { createContext, useContext, useEffect, useState } from 'react'
import FancyButton from './fancy-button'
import { Color } from '@/lib/Colors'
import { useTranslations } from 'next-intl'

export const DialogContext = createContext<{
  opened: boolean
  setOpened: (open: boolean) => void
} | null>(null)

export const Dialog = ({ children, open, onOpenChange }: { children: React.ReactNode, open?: boolean, onOpenChange?: (open: boolean) => void }) => {
  const [opened, setOpened] = useState(false)

  if (open !== undefined && onOpenChange !== undefined) {
    return (
      <DialogContext.Provider value={{ opened: open, setOpened: onOpenChange }}>
        { children }
      </DialogContext.Provider>
    )
  }

  return (
    <DialogContext.Provider value={{ opened, setOpened }}>
      { children }
    </DialogContext.Provider>
  )
}

export const DialogTrigger = ({ children, color, size, className }: { children: React.ReactNode, color?: Color, size?: 'sm' | 'lg', className?: string }) => {
  const context = useContext(DialogContext)
  if (!context) throw new Error("DialogTrigger must be used within a Dialog")

  return (
    <FancyButton size={ size } color={ color } onClick={() => context.setOpened(!context.opened)} className={ className }>
      { children }
    </FancyButton>
  )
}

export const DialogContent = ({ children }: { children: React.ReactNode }) => {
  const context = useContext(DialogContext)
  if (!context) throw new Error("DialogContent must be used within a Dialog")

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        context.setOpened(false)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [context])

  if (context.opened === false) {
    return null
  }

  return (
    <>
      <section
        className='fixed left-0 top-0 w-full h-screen bg-black/50 z-10 flex items-center justify-center'
        onClick={() => { context.setOpened(false) }}
      >
        <div
          className='bg-white shadow-neutral-100 dark:bg-neutral-900 dark:shadow-neutral-950 shadow-[0_8px] rounded-xl z-30 flex flex-col m-4'
          onClick={(e) => e.stopPropagation()}
        >
          { children }
        </div>
      </section>
    </>
  )
}

export const DialogHeader = ({ title }: { title: string }) => {
  const context = useContext(DialogContext)
  if (!context) throw new Error("DialogHeader must be used within a Dialog")
  
  const t = useTranslations('Buttons')

  return (
    <header className='p-2 shadow flex gap-4 justify-between items-center'>
      <h1 className='ml-2 text-xl font-semibold'>
        { title }
      </h1>
      <div className='flex gap-1'>
        <FancyButton size='sm' onClick={ () => context.setOpened(false) }>
          { t('close') }
        </FancyButton>
      </div>
    </header>
  )
}


