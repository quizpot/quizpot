import { Color } from '@/lib/Colors'
import React from 'react'
import FancyButton from './fancy-button'

const PasswordInput = ({ 
  value, 
  onChange,
  color,
  className,
  placeholder,
  name,
  required
}: { 
  value?: string, 
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
  color?: Color,
  className?: string,
  placeholder?: string,
  name?: string,
  required?: boolean
}) => {
  return (
    <FancyButton color={ color } asChild>
      <input 
        type='password'
        name={ name }
        className={ className }
        onChange={ onChange } 
        value={ value }
        placeholder={ placeholder }
        required={ required }
      />
    </FancyButton>
  )
}

export default PasswordInput