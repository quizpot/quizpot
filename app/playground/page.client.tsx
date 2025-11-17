"use client"
import React from 'react'
import { useToast } from '@/components/ui/toaster'
import Section from '@/components/ui/Section'
import Header from '@/components/nav/Header'
import FancyButton from '@/components/ui/fancy-button'

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
          <FancyButton onClick={() => {
            toast('Hello world!', { description: 'This is a toast!' })
          }}>
            Empty Toast
          </FancyButton>
          <FancyButton color='green' onClick={() => {
            toast('Hello world!', { variant: 'success', description: 'This is a toast, with date: ' + new Date().toLocaleString() })
          }}>
            Success Toast
          </FancyButton>
          <FancyButton color='red' onClick={() => {
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
          </FancyButton>
          <FancyButton color='blue' onClick={() => {
            toast('Hello world!', { variant: 'info', description: 'This is a' })
          }}>
            Info Toast
          </FancyButton>
        </div>
      </Section>
    </>
  )
}

export default PlaygroundClientPage