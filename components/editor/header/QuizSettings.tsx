"use client"
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/Dialog'
import React from 'react'
import TextInput from '@/components/ui/TextInput'
import ColorInput from '@/components/ui/ColorInput'
import ImageInput from '@/components/ui/ImageInput'
import { useToast } from '@/components/ui/Toaster'
import { useEditorQuizFile } from '../providers/EditorQuizFileProvider'

const QuizSettings = () => {
  const addToast = useToast()
  const { quizFile, setQuizFile } = useEditorQuizFile()

  const onThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
    const files = e.target?.files

    if (!files || files.length === 0) {
      addToast({ message: 'Please select a valid file', type: 'error' })
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
        addToast({ message: 'Thumbnail updated', type: 'success' })
      }

      reader.onerror = (error) => {
        addToast({ message: 'Error converting file to base64: ' + error, type: 'error' })
      }
    } else {
      addToast({ message: 'Please select a valid file', type: 'error' })
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
      alert("Please select a valid file")
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
        addToast({ message: 'Error converting file to base64: ' + error, type: 'error' })
      }
    } else {
      addToast({ message: 'Please select a valid file', type: 'error' })
    }
  }

  return (
    <Dialog>
      <DialogTrigger variant='gray' className='font-semibold'>
        Settings
      </DialogTrigger>
      <DialogContent>
        <DialogHeader title="Quiz Settings" />
        <section className="relative flex-grow overflow-y-auto">
          <div className='w-full h-full p-4 flex flex-col gap-4'>
            <div className='flex gap-4 items-center'>
              <h1 className='mb-2 text-xl whitespace-nowrap'>Thumbnail</h1>
              <ImageInput 
                className='w-full' 
                onChange={ onThumbnailChange } 
              />
            </div>
            <div className='flex gap-4 items-center'>
              <h1 className='mb-2 text-xl whitespace-nowrap'>Title</h1>
              <TextInput
                className='w-full'
                value={ quizFile.title }
                onChange={ onTitleChange }
              />
            </div>
            <div className='flex gap-4 items-center'>
              <h1 className='mb-2 text-xl whitespace-nowrap'>Description</h1>
              <TextInput
                className='w-full'
                value={ quizFile.description }
                onChange={ onDescriptionChange } 
              />
            </div>
            <div className='flex gap-4 items-center'>
              <h1 className='text-xl whitespace-nowrap'>Background</h1>
              <ColorInput
                value={ quizFile.theme.background }
                onChange={ onBackgroundChange } 
              />
              <ImageInput
                className='w-full'
                onChange={ onBackgroundImageChange } 
              />
            </div>
          </div>
        </section>
      </DialogContent>
    </Dialog>
  )
}

export default QuizSettings