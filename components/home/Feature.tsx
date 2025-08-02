import Image from 'next/image'
import React from 'react'

const Feature = ({ title, description, img }: { title: string, description: string, img: string }) => {
  return (
    <section className='w-full group'>
      <div className='container mx-auto py-12 p-4 grid grid-cols-1 md:grid-cols-2 items-center justify-center gap-8'>
        <div className='md:group-odd:order-2 text-center md:group-odd:text-left md:text-right flex flex-col justify-center gap-4'>
          <h1 className='text-2xl font-semibold'>{ title }</h1>
          <p className='ml-auto group-odd:ml-0 max-w-md'>{ description }</p>
        </div>
        <div>
          <Image src={ img } alt={ title } width={ 240 } height={ 240 } className='mx-auto md:ml-0 md:mr-auto md:group-odd:ml-auto md:group-odd:mr-0' />
        </div>
      </div>
    </section>
  )
}

export default Feature