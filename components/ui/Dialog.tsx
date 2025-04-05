"use client"
import React, { createContext, useContext, useEffect } from 'react'
import Button from './Button'

export const DialogContext = createContext<{
  opened: boolean
  setOpened: (open: boolean) => void
} | null>(null)

// Root dialog component
export const Dialog = ({ children }: { children: React.ReactNode }) => {
  const [opened, setOpened] = React.useState(false)

  return (
    <DialogContext.Provider value={{ opened, setOpened }}>
      { children }
    </DialogContext.Provider>
  )
}

// Component that triggers the dialog
export const DialogTrigger = ({ children }: { children: React.ReactNode }) => {
  const context = useContext(DialogContext)
  if (!context) throw new Error("DialogTrigger must be used within a Dialog")

  return (
    <Button variant="secondary" onClick={() => context.setOpened(!context.opened)}>
      { children }
    </Button>
  )
}

// Content of the dialog
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
          className='bg-white w-[800px] h-[600px] rounded-lg shadow z-30 flex flex-col'
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

  return (
    <header className='p-2 shadow flex justify-between items-center'>
      <h1 className='ml-2 text-xl font-semibold'>
        { title }
      </h1>
      <div className='flex gap-1'>
        <Button onClick={() => context.setOpened(false)} variant="secondary">
          Close
        </Button>
      </div>
    </header>
  )
}


