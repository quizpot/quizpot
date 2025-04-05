import React from 'react'

const TextAreaInput = ({ value, onChange }: { value: string, onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void }) => {
  return (
    <textarea
      className='p-2 border-2 border-gray-400 rounded w-full'
      onChange={(e) => { onChange(e) }} 
      defaultValue={ value }
    />
  )
}

export default TextAreaInput