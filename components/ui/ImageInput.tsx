"use client"
import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from './dialog'
import TextInput from './TextInput'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import FancyButton from './fancy-button'
import { Color } from '@/lib/Colors'

const ImageInput = ({ 
  onChange,
  className,
  color
}: { 
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  className?: string,
  color?: Color
}) => {
  const [open, setOpen] = useState(false)
  const t = useTranslations('SelectImageInput')

  return (
    <Dialog open={ open } onOpenChange={ (open) => { setOpen(open) } }>
      <DialogTrigger color={ color } className={ className }>
        { t('button') }
      </DialogTrigger>
      <DialogContent>
        <DialogHeader title={ t('title') } />
        <div className='p-4 flex flex-col gap-4'>
          <div className='flex gap-4 justify-center items-center'>
            <h1>{ t('fromFile') }:</h1>
            <FancyButton asChild>
              <input
                type='file'
                accept='image/*'
                onChange={(e) => { onChange(e) }} 
              />
            </FancyButton>
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
  const t = useTranslations('SelectImageInput')

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
      <DialogTrigger className='w-full'>
        { t('fromPixabay') }
      </DialogTrigger>
      <DialogContent>
        <DialogHeader title={ t('selectFromPixabay') } />
        <div className='p-4 flex flex-col gap-4'>
          <div className='flex gap-4 justify-center items-center'>
            <h1 className='w-fit'>{ t('search') }:</h1>
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