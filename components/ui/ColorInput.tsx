import React from 'react'

const ColorInput = ({ 
  value, 
  className, 
  onChange,
  name,
  disabled
}: { 
  value?: string, 
  className?: string, 
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
  name?: string,
  disabled?: boolean
}) => {
  return (
    <input 
      type='color'
      disabled={ disabled }
      className={ className }
      onChange={ onChange } 
      defaultValue={ value }
      name={ name }
    />
  )
}

export default ColorInput