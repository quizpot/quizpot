import { Color } from '@/lib/colors'
import React from 'react'
import FancyButton from './fancy-button'

const TextInput = ({ 
  value, 
  onChange,
  color,
  className,
  placeholder,
  required,
  disabled,
  name,
  onKeyDown,
}: { 
  value?: string, 
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void 
  color?: Color,
  className?: string,
  placeholder?: string,
  required?: boolean,
  disabled?: boolean,
  name?: string,
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void,
}) => {
  return (
    <FancyButton color={ color } disabled={ disabled } asChild>
      <input 
        type='text'
        className={ className }
        onChange={ onChange } 
        placeholder={ placeholder }
        value={ value }
        required={ required }
        disabled={ disabled }
        name={ name }
        onKeyDown={ onKeyDown }
      />
    </FancyButton>
  )
}

export default TextInput