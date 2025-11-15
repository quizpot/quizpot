import React from 'react'
import Button from './ButtonOld'

const DeviceScreenUnsupported = () => {
  return (
    <section className='z-[9999] fixed left-0 top-0 flex md:hidden bg-white flex-col items-center justify-center gap-4 h-screen w-full p-4'>
      <h1 className='text-2xl font-semibold'>Device Unsupported</h1>
      <p className='text-center max-w-md'>This device is not supported due to its screen size. Please use a computer to access this page.</p>
      <Button href='/' variant='gray'>
        Home
      </Button>
    </section>
  )
}

export default DeviceScreenUnsupported