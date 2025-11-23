import React from 'react'

const ColorInput = ({ value, className, onChange }: { value: string, className?: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => {
  return (
    <input 
      type='color'
      className={ className }
      onChange={(e) => { onChange(e) }} 
      defaultValue={ value }
    />
  )
}

export default ColorInput