import { Color } from '@/lib/colors'
import React from 'react'
import FancyButton from './fancy-button'

const EmailInput = ({ 
  value, 
  onChange,
  color,
  className,
  placeholder,
  required,
  disabled,
  name
}: { 
  value?: string, 
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void 
  color?: Color,
  className?: string,
  placeholder?: string,
  required?: boolean,
  disabled?: boolean,
  name?: string
}) => {
  return (
    <FancyButton color={ color } disabled={ disabled } asChild>
      <input 
        type='email'
        name={ name }
        className={ className }
        onChange={ onChange } 
        placeholder={ placeholder }
        required={ required }
        disabled={ disabled }
        value={ value }
      />
    </FancyButton>
  )
}

export default EmailInput