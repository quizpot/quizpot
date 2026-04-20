import React from 'react'
import FancyButton from './fancy-button'

const NumberInput = ({ 
  value, 
  onChange, 
  placeholder,
  name,
  required,
  disabled,
  className
}: { 
  value?: number, 
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void, 
  placeholder?: string,
  name?: string,
  required?: boolean,
  disabled?: boolean,
  className?: string
}) => {
  return (
    <FancyButton disabled={ disabled } asChild>
      <input 
        type='number'
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