import React from 'react'

const TextInput = ({ value, onChange }: { value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => {
  return (
    <input 
      type='text'
      className='p-2 border-2 border-gray-400 rounded w-full'
      onChange={(e) => { onChange(e) }} 
      value={ value }
    />
  )
}

export default TextInput