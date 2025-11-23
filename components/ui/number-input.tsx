import React from 'react'
import FancyButton from './fancy-button'

const NumberInput = ({ value, onChange, placeholder }: { value: number, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, placeholder?: string }) => {
  return (
    <FancyButton asChild>
      <input 
        type='number'
        placeholder={ placeholder }
        onChange={(e) => { onChange(e) }} 
        value={ value }
      />
    </FancyButton>
  )
}

export default NumberInput