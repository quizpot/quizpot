"use client"
import React from 'react'
import NumberInput from '../../ui/NumberInput'
import Button from '../../ui/Button'

const SetCodePage = () => {
  const [code, setCode] = React.useState<number>(0)

  return (
    <section className='flex flex-col gap-4 items-center justify-center h-screen w-full p-4'>
      <h1 className='text-2xl font-semibold'>Lobby Code</h1>
      <div className='max-w-md'>
        <NumberInput onChange={(e) => {
          const value = e.target.value
          if (value === '') {
            setCode(0)
          } else {
            setCode(parseInt(e.target.value))
          }
        }} value={ code } />
      </div>
      <Button href={'./play?code=' + code} variant='green' >
        Continue
      </Button>
    </section>
  )
}

export default SetCodePage