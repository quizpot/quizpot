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
}

export default Feature