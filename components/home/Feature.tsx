import React from 'react'
import Card from '../ui/Card'

const Feature = ({ title, description, icon }: { title: string, description: string, icon: React.ReactNode }) => {
  return (
    <Card className='px-4 py-4 flex gap-2'>
      <div className='p-4 flex items-center justify-center'>
        { icon }
      </div>
      <div className='flex flex-col gap-2'>
        <h1 className='text-2xl font-semibold'>{ title }</h1>
        <p className=''>{ description }</p>
      </div>
    </Card>
  )

  return (
    <section className='w-full group'>
      <div className='container mx-auto py-12 p-4 grid grid-cols-1 md:grid-cols-2 items-center justify-center gap-8 lg:gap-16'>
        <div className='md:group-odd:order-2 text-center md:group-odd:text-left md:text-right flex flex-col justify-center gap-4'>
          <h1 className='text-4xl font-semibold'>{ title }</h1>
          <p className='mx-auto md:mr-0 md:ml-auto group-odd:md:ml-0 max-w-md'>{ description }</p>
        </div>
        <div>
          { icon }
        </div>
      </div>
    </section>
  )
}

export default Feature