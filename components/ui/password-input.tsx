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
  required,
  disabled
}: { 
  value?: string, 
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
  color?: Color,
  className?: string,
  placeholder?: string,
  name?: string,
  required?: boolean,
  disabled?: boolean
}) => {
  return (
    <FancyButton color={ color } disabled={ disabled } asChild>
      <input 
        type='password'
        name={ name }
        className={ className }
        onChange={ onChange } 
        value={ value }
        placeholder={ placeholder }
        required={ required }
        disabled={ disabled }
      />
    </FancyButton>
  )
}

export default PasswordInput