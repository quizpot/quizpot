"use client"
import React, { useState } from 'react'
import FancyButton from './fancy-button'

const BooleanInput = ({ value, className, children, onChange }: { value: boolean, className?: string, children?: React.ReactNode, onChange: (value: boolean) => void }) => {
  const [state, setState] = useState(value)

  const onClick = () => {
    setState(!state)
    onChange(!state)
  }

  return (
    <FancyButton color={ state ? 'green' : 'red' } onClick={ onClick } className={ className }>
      { children }
    </FancyButton>
  )

  return (
    <section onClick={ onClick } className={ (value ? 'bg-green-500' : 'bg-red-500') + ' p-4 rounded-full duration-200' }></section>
  )
}

export default BooleanInput