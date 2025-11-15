import Button from '@/components/ui/ButtonOld'
import React from 'react'

const NotFoundPage = () => {
  return (
    <div className='flex flex-col items-center justify-center gap-4 h-screen w-full p-4'>
      <h1 className='text-2xl font-semibold'>404 - Not Found</h1>
      <Button href='/' variant='gray'>
        Home
      </Button>
    </div>
  )
}

export default NotFoundPage