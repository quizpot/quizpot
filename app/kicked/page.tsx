import Button from '@/components/ui/Button'
import React from 'react'

const page = () => {
  return (
    <div className='flex flex-col items-center justify-center gap-4 h-screen w-full p-4'>
      <h1 className='text-2xl font-semibold'>OOPS - You were kicked</h1>
      <Button href='/' variant='secondary'>
        Home
      </Button>
    </div>
  )
}

export default page