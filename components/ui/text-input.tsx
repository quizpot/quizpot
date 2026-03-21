import { Color } from '@/lib/Colors'
import React from 'react'
import FancyButton from './fancy-button'

const TextInput = ({ 
  value, 
  onChange,
  color,
  className,
  placeholder,
  required,
  name
}: { 
  value?: string, 
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void 
  color?: Color,
  className?: string,
  placeholder?: string,
  required?: boolean,
  name?: string
}) => {
  return (
    <FancyButton color={ color } asChild>
      <input 
        type='text'
        className={ className }
        onChange={ onChange } 
        placeholder={ placeholder }
        value={ value }
        required={ required }
        name={ name }
      />
    </FancyButton>
  )
}

export default TextInput