import { Color } from '@/lib/Colors'
import React from 'react'
import FancyButton from './fancy-button'

const EmailInput = ({ 
  value, 
  onChange,
  color,
  className,
  placeholder,
  name
}: { 
  value?: string, 
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void 
  color?: Color,
  className?: string,
  placeholder?: string,
  name?: string
}) => {
  return (
    <FancyButton color={ color } asChild>
      <input 
        type='email'
        name={ name }
        className={ className }
        onChange={ onChange } 
        placeholder={ placeholder }
        value={ value }
      />
    </FancyButton>
  )
}

export default EmailInput