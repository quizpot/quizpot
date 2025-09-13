import Image from 'next/image'
import React from 'react'

const Preview = () => {
  return (
    <section className='w-full -mt-32'>
      <div className='container mx-auto w-full p-4 mb-16'>
        <Image src='/img/preview.png' alt='Preview' width={ 1280 } height={ 720 } className='mx-auto rounded shadow-2xl' />
      </div>
    </section>
  )
}

export default Preview