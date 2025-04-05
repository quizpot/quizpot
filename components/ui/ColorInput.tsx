import React from 'react'

const ColorInput = ({ value, onChange }: { value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => {
  return (
    <input 
      type='color'
      className=''
      onChange={(e) => { onChange(e) }} 
      defaultValue={ value }
    />
  )
}

export default ColorInput