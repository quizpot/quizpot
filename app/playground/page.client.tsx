"use client"
import React from 'react'
import Button from '@/components/ui/Button'
import { useToast } from '@/components/ui/Toaster'
import Header from '@/components/home/Header'
import Section from '@/components/ui/Section'

const PlaygroundClientPage = () => {
  const toast = useToast()
  
  return (
    <>
      <Header />

      <Section className='flex items-center justify-center py-16 mt-24'>
        <h1 className='text-4xl font-semibold'>Playground</h1>
      </Section>

      <Section className='flex flex-col gap-8 items-center justify-center py-16 mt-24'>
        <h1 className='text-4xl font-semibold'>Toasts</h1>
        <div className='flex gap-4 items-center font-semibold'>
          <Button onClick={() => {
            toast('Hello world!', { description: 'This is a toast!' })
          }}>
            Empty Toast
          </Button>
          <Button variant='green' onClick={() => {
            toast('Hello world!', { variant: 'success', description: 'This is a toast, with date: ' + new Date().toLocaleString() })
          }}>
            Success Toast
          </Button>
          <Button variant='red' onClick={() => {
            toast('Hello world!', { variant: 'error', description: 'This is Toyota Corolla 2022 as Float: 1.5', 
              action: {
                label: 'Action',
                onClick: () => {
                  console.log('Action clicked!')
                }
              } 
            })
          }}>
            Error Toast
          </Button>
          <Button variant='blue' onClick={() => {
            toast('Hello world!', { variant: 'info', description: 'This is a' })
          }}>
            Info Toast
          </Button>
        </div>
      </Section>
    </>
  )
}

export default PlaygroundClientPage