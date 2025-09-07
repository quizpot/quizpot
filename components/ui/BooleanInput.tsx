"use client"
import React, { useState } from 'react'

const BooleanInput = ({ value, onChange }: { value: boolean, onChange: (value: boolean) => void }) => {
  const [state, setState] = useState(value)

  const onClick = () => {
    setState(!state)
    onChange(!state)
  }

  return (
    <section onClick={ onClick } className={ (value ? 'bg-green-500' : 'bg-red-500') + ' p-4 rounded-full duration-200' }></section>
  )
}

export default BooleanInput