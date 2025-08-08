import React from 'react'

const QuizFileInput = ({ onChange, disabled }: { onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void, disabled?: boolean }) => {
  return (
    <input 
      type='file'
      accept=".qp, .json"
      className='p-2 border-b-4 bg-neutral-200 border-neutral-300 rounded w-full text-center disabled:cursor-not-allowed'
      placeholder='Upload quiz file'
      onChange={onChange} 
      disabled={disabled}
    />
  )
}

export default QuizFileInput