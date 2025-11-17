"use client"
import React from 'react'
import Button from './ButtonOld'

const DebugButton = () => {
  return (
    <Button onClick={() => {
      window.open('./play', '_blank')
      window.open('./play', '_blank')
      window.open('./host', '_blank')
      window.open('./debug', '_blank')?.focus()
    }} variant='blue' className='text-lg font-semibold'>
      Debug
    </Button>
  )
}

export default DebugButton