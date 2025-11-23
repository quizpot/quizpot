"use client"
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import React from 'react'
import TextInput from '@/components/ui/TextInput'
import ColorInput from '@/components/ui/ColorInput'
import ImageInput from '@/components/ui/ImageInput'
import { useToast } from '@/components/ui/toaster'
import { useEditorQuizFile } from '../providers/EditorQuizFileProvider'
import { useTranslations } from 'next-intl'
import FancyButton from '@/components/ui/fancy-button'

const QuizSettings = () => {
  const toast = useToast() 
  const t = useTranslations('QuizSettings')
  const { quizFile, setQuizFile } = useEditorQuizFile()

  const onThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
    const files = e.target?.files

    if (!files || files.length === 0) {
      toast('Please select a valid file', { variant: 'error' })
      return
    }

    const file = files[0]
    
    if (file) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        setQuizFile({
          ...quizFile,
          thumbnail: reader.result as string
        })
        
        toast('Thumbnail updated', { variant: 'success' })
      }

      reader.onerror = (error) => {
        toast('Error converting file to base64', { variant: 'error' })
        console.error(error)
      }
    } else {
      toast('Please select a valid file', { variant: 'error' })
    }
  }

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
    setQuizFile({
      ...quizFile,
      title: e.target.value
    })
  }

  const onDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
    setQuizFile({
      ...quizFile,
      description: e.target.value
    })
  }

  const onBackgroundChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
    setQuizFile({
      ...quizFile,
      theme: {
        ...quizFile.theme,
        background: e.target.value
      }
    })
  }

  const onBackgroundImageChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
    const files = e.target?.files

    if (!files || files.length === 0) {
      toast('Please select a valid file', { variant: 'error' })
      return
    }

    const file = files[0]
    
    if (file) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        setQuizFile({
          ...quizFile,
          theme: {
            ...quizFile.theme,
            background: reader.result as string
          }
        })
      }

      reader.onerror = (error) => {
        toast('Error converting file to base64', { variant: 'error' })
        console.error(error)
      }
    } else {
      toast('Please select a valid file', { variant: 'error' })
    }
  }

  return (
    <Dialog>
      <DialogTrigger>
        { t('button') }
      </DialogTrigger>
      <DialogContent>
        <DialogHeader title={ t('dialogTitle') } />
        <section className="relative flex-grow overflow-y-auto min-w-md">
          <div className='w-full h-full p-4 flex flex-col gap-8'>
            <div className='flex flex-col gap-2'>
              <h1 className='text-xl'>
                { t('thumbnail') }
              </h1>
              <ImageInput 
                className='w-full' 
                onChange={ onThumbnailChange } 
              />
            </div>
            <div className='flex flex-col gap-2'>
              <h1 className='text-xl'>
                { t('title') }
              </h1>
              <TextInput
                className='w-full'
                value={ quizFile.title }
                onChange={ onTitleChange }
              />
            </div>
            <div className='flex flex-col gap-2'>
              <h1 className='text-xl'>
                { t('description') }
              </h1>
              <TextInput
                className='w-full'
                value={ quizFile.description }
                onChange={ onDescriptionChange } 
              />
            </div>
            <div className='flex flex-col gap-2'>
              <h1 className='text-xl'>
                { t('background') }
              </h1>
              <div className='flex gap-2 items-center'>
                <div style={{ 
                  backgroundColor: quizFile.theme.background.length === 7 ? quizFile.theme.background : 'transparent' 
                }} className='rounded'>
                  <FancyButton className='p-0' asChild>
                    <ColorInput
                      className='opacity-0'
                      value={ quizFile.theme.background }
                      onChange={ onBackgroundChange } 
                    />
                  </FancyButton>
                </div>
                <ImageInput
                  className='w-full'
                  onChange={ onBackgroundImageChange } 
                />
              </div>
            </div>
          </div>
        </section>
      </DialogContent>
    </Dialog>
  )
}

export default QuizSettings