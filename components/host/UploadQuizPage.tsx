import React from 'react'
import UploadQuizPrompt from './UploadQuizPrompt'

const UploadQuizPage = () => {
  return (
    <section className='min-h-screen w-full flex flex-col items-center justify-center'>
      <div className='flex flex-col items-center justify-center gap-4 p-4 max-w-md'>
        <h1 className='text-2xl font-semibold'>Upload Quiz</h1>
        <UploadQuizPrompt />
      </div>
    </section>
  )
}

export default UploadQuizPage