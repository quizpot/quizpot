import React from 'react'

const NumberInput = ({ value, onChange }: { value: number, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => {
  return (
    <input 
      type='number'
      className='p-2 border-2 border-gray-400 rounded w-full'
      onChange={(e) => { onChange(e) }} 
      value={ value }
    />
  )
}

export default NumberInput