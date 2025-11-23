import { Color } from '@/lib/Colors'
import React from 'react'
import FancyButton from './fancy-button'

const PasswordInput = ({ 
  value, 
  onChange,
  color,
  className
}: { 
  value: string, 
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  color?: Color,
  className?: string
}) => {
  return (
    <FancyButton color={ color } asChild>
      <input 
        type='password'
        className={ className }
        onChange={ (e) => { onChange(e) } } 
        value={ value }
      />
    </FancyButton>
  )
}

export default PasswordInput