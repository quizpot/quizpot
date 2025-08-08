"use client"
import React from 'react'
import Button from './Button'

const DebugButton = () => {
  return (
    <Button onClick={() => {
      window.open('./play', '_blank')
      window.open('./play', '_blank')
      window.open('./host', '_blank')
      window.open('./debug', '_blank')?.focus()
    }} variant='primary' className='text-lg font-semibold'>
      Debug
    </Button>
  )
}

export default DebugButton