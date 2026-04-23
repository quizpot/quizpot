import React from 'react'
import FancyButton from './fancy-button'
import { Color } from '@/lib/colors'

const NumberInput = ({ 
  value, 
  onChange, 
  placeholder,
  name,
  required,
  disabled,
  className,
  color,
  min,
  max
}: { 
  value?: number, 
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void, 
  placeholder?: string,
  name?: string,
  required?: boolean,
  disabled?: boolean,
  className?: string,
  color?: Color,
  min?: number,
  max?: number
}) => {
  return (
    <FancyButton disabled={ disabled } color={ color } asChild>
      <input 
        type='number'
        min={ min }
        max={ max }
        name={ name }
        placeholder={ placeholder }
        onChange={ onChange } 
        value={ value }
        required={ required }
        disabled={ disabled }
        className={ className }
      />
    </FancyButton>
  )
}

export default NumberInput