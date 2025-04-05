import React from 'react'

const ImageInput = ({ onChange }: { onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => {
  return (
    <input 
      type='file'
      accept='image/*'
      className='p-2 border-2 border-gray-400 rounded w-full text-center'
      onChange={(e) => { onChange(e) }} 
    />
  )
}

export default ImageInput