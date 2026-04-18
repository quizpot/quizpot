import React from 'react'

const ColorInput = ({ 
  value, 
  className, 
  onChange,
  name
}: { 
  value?: string, 
  className?: string, 
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
  name?: string
}) => {
  return (
    <input 
      type='color'
      className={ className }
      onChange={ onChange } 
      defaultValue={ value }
      name={ name }
    />
  )
}

export default ColorInput