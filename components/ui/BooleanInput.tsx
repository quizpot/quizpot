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
    <FancyButton color={ value ? 'green' : 'red' } onClick={ onClick } className={ className }>
      { children }
    </FancyButton>
  )
}

export default BooleanInput