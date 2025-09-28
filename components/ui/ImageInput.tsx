"use client"
import { colorStyles, ColorVariants } from '@/lib/client/colorVariants/ColorVariants'
import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from './Dialog'
import TextInput from './TextInput'
import Image from 'next/image'

const ImageInput = ({ 
  onChange,
  variant,
  className
}: { 
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  variant?: ColorVariants,
  className?: string
}) => {
  const [open, setOpen] = useState(false)
  if (!variant) {
    variant = 'gray'
  }

  const { parent: parentClassName, child: childClassName } = colorStyles[variant]

  return (
    <Dialog open={ open } onOpenChange={ (open) => { setOpen(open) } }>
      <DialogTrigger variant={ variant } className={ className }>
        Select Image
      </DialogTrigger>
      <DialogContent>
        <DialogHeader title='Select Image' />
        <div className='p-4 flex flex-col gap-4'>
          <div className='flex gap-4 justify-center'>
            <h1>From file:</h1>
            <div className={`pb-0.5 ${className?.includes('w-full') ? 'w-full' : ''} rounded ` + parentClassName}>
              <input 
                type='file'
                accept='image/*'
                className={`
                  rounded px-2 py-1
                  -translate-y-1
                  focus:outline-none focus:border-0
                  duration-200 w-full 
                ` + childClassName + ' ' + className }
                onChange={(e) => { onChange(e) }} 
              />
            </div>
          </div>
          {
            process.env.NEXT_PUBLIC_PIXABAY_KEY && (
              // @ts-expect-error returns only image
              <PixabayInput setImage={ (image) => { onChange({ target: { files: [image] } }); setOpen(false) } } />
            )
          }
        </div>
      </DialogContent>
    </Dialog>
  )
}

export const PixabayInput = ({ setImage }: { setImage: (image: Blob) => void }) => {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [images, setImages] = useState<string[]>([])

  const key = process.env.NEXT_PUBLIC_PIXABAY_KEY

  useEffect(() => {
    const onSearch = async () => {
      if (!query || query.length <= 2) {
        return
      }

      const response = await fetch(`https://pixabay.com/api/?key=${key}&q=${query}`)
      const json = await response.json()

      if (json.totalHits <= 0) {
        return
      }

      // @ts-expect-error unknown object
      setImages(json.hits.map((hit) => hit.webformatURL))
    }
    const timout = setTimeout(() => {
      onSearch()
    }, 500)

    return () => {
      clearTimeout(timout)
    }
  }, [query, key])

  if (!key) {
    return null
  }

  const handleImage = (url: string) => {
    fetch(url)
      .then(res => res.blob())
      .then(blob => {
        setImage(blob)
        setOpen(false)
      })
  }

  return (
    <Dialog open={ open } onOpenChange={ (open) => { setOpen(open) } }>
      <DialogTrigger variant={'gray'} className='w-full'>
        Select From Pixabay
      </DialogTrigger>
      <DialogContent>
        <DialogHeader title='Search Image on Pixabay' />
        <div className='p-4 flex flex-col gap-4'>
          <div className='flex gap-4 justify-center'>
            <h1 className='w-fit'>Search:</h1>
            <TextInput value={ query } onChange={ (e) => { setQuery(e.target.value) } } className='w-full' />
          </div>
          <div className='grid grid-cols-2 gap-4 h-96 overflow-y-scroll'>
            {
              images.map((image, index) => (
                <div key={index} className='relative w-48 h-48' onClick={ () => { handleImage(image) } }>
                  <Image src={ image } alt='Image' fill className='w-full h-full object-contain' />
                </div>
              ))
            }
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}


export default ImageInput