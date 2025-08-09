import React from 'react'

const NumberInput = ({ value, onChange, placeholder }: { value: number, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, placeholder?: string }) => {
  return (
    <div className='pb-1 rounded bg-neutral-200'>
      <input 
        type='number'
        placeholder={ placeholder }
        className='p-2 rounded w-full bg-neutral-100 outline-transparent border-transparent'
        onChange={(e) => { onChange(e) }} 
        value={ value }
      />
    </div>
    
  )
}

export default NumberInput