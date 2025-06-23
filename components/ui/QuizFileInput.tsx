import React from 'react'

const QuizFileInput = ({ onChange }: { onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => {
  return (
    <input 
      type='file'
      accept='application/qp'
      className='p-2 border-2 border-gray-400 rounded w-full text-center'
      onChange={onChange} 
    />
  )
}

export default QuizFileInput