"use client"
import ImageInput from '@/components/ui/ImageInput'
import Image from 'next/image'
import React from 'react'
import Button from '@/components/ui/ButtonOld'
import { useEditorCurrentQuestion } from '../../providers/EditorCurrentQuestionProvider'
import { useEditorQuizFile } from '../../providers/EditorQuizFileProvider'
import { useToast } from '@/components/ui/toaster'

const QuestionImage = () => {
  const toast = useToast()
  const { quizFile, setQuizFile } = useEditorQuizFile()
  const { currentQuestionIndex } = useEditorCurrentQuestion()

  if (quizFile.questions[currentQuestionIndex].questionType === 'slide') return <></>

  const imageURL = quizFile.questions[currentQuestionIndex].image

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
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
        const updatedQuizFile = { ...quizFile }
        updatedQuizFile.questions = [...updatedQuizFile.questions]

        if (updatedQuizFile.questions[currentQuestionIndex].questionType === 'slide') return

        updatedQuizFile.questions[currentQuestionIndex] = {  
          ...updatedQuizFile.questions[currentQuestionIndex],  
          image: reader.result as string  
        }

        setQuizFile(updatedQuizFile)
      }

      reader.onerror = (error) => {
        console.error("Error converting file to base64:", error);
      }
    } else {
      toast('Please select a valid file', { variant: 'error' })
    }
  }

  const onRemoveImage = () => {
    const updatedQuizFile = { ...quizFile }
    updatedQuizFile.questions = [...updatedQuizFile.questions]

    if (updatedQuizFile.questions[currentQuestionIndex].questionType === 'slide') return

    updatedQuizFile.questions[currentQuestionIndex] = {  
      ...updatedQuizFile.questions[currentQuestionIndex],  
      image: undefined  
    }

    setQuizFile(updatedQuizFile)
  }

  if (imageURL === undefined || !imageURL) {
    return (
      <section className='flex items-center justify-center'>
        <ImageInput onChange={ onChange } />
      </section>
    )
  }

  return (
    <section className='flex items-center justify-center h-full w-full'>
      <div className='w-full h-full flex flex-col items-center justify-center gap-4'>
        <div className='relative w-full h-full'>
          <Image
            alt='Question Image'
            src={ imageURL }
            fill={ true }
            className='object-contain'
          />
        </div>
        <div className='flex gap-4 p-4'>
          <ImageInput className='w-full' onChange={ onChange } />
          <Button variant='red' className='text-nowrap' onClick={ onRemoveImage }>
            Remove Image
          </Button>
        </div>
      </div>
    </section>
  )
}

export default QuestionImage