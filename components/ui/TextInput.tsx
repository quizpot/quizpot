import { Color } from '@/lib/Colors'
import React from 'react'
import FancyButton from './fancy-button'

const TextInput = ({ 
  value, 
  onChange,
  color,
  className
}: { 
  value: string, 
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void 
  color?: Color,
  className?: string
}) => {
  return (
    <FancyButton color={ color } asChild>
      <input 
        type='text'
        className={ className }
        onChange={ (e) => { onChange(e) } } 
        value={ value }
      />
    </FancyButton>
  )
}

export default TextInput