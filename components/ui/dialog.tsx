"use client"
import React, { createContext, useContext, useEffect, useState } from 'react'
import FancyButton from './fancy-button'
import { Color } from '@/lib/colors'
import { useTranslations } from 'next-intl'
import FancyCard from './fancy-card'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

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
    <FancyButton 
      size={ size } 
      color={ color } 
      onClick={(e) => { 
        e.stopPropagation(); 
        context.setOpened(!context.opened) 
      }} 
      className={ className }
    >
      { children }
    </FancyButton>
  )
}

export const DialogContent = ({ children, className }: { children: React.ReactNode, className?: string }) => {
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
        onClick={(e) => { 
          e.stopPropagation(); 
          context.setOpened(false) 
        }}
      >
        <FancyCard
          color="background"
          className={ cn('p-0 min-w-sm', className) }
          onClick={(e) => e.stopPropagation()}
        >
          { children }
        </FancyCard>
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
        <FancyButton size='sm' className='mb-2' onClick={ () => context.setOpened(false) }>
          <X />
        </FancyButton>
      </div>
    </header>
  )
}
