"use client"
import ImageInput from '@/components/ui/ImageInput'
import Image from 'next/image'
import React from 'react'
import Button from '@/components/ui/Button'
import { useEditorCurrentQuestion } from '../../providers/EditorCurrentQuestionProvider'
import { useEditorQuizFile } from '../../providers/EditorQuizFileProvider'

const QuestionImage = () => {
  const { quizFile, setQuizFile } = useEditorQuizFile()
  const { currentQuestionIndex } = useEditorCurrentQuestion()

  const imageURL = quizFile.questions[currentQuestionIndex].image

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
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
        const updatedQuizFile = { ...quizFile }
        updatedQuizFile.questions = [...updatedQuizFile.questions]
        updatedQuizFile.questions[currentQuestionIndex] = {  
          ...updatedQuizFile.questions[currentQuestionIndex],  
          image: reader.result as string  
        }

        setQuizFile(updatedQuizFile)
      }

      reader.onerror = (error) => {
        console.error("Error converting file to base64:", error);
      }

      setQuizFile({
        ...quizFile,
        theme: {
          ...quizFile.theme,
          background: e.target.value
        }
      })
    } else {
      alert("Please select a valid file")
    }
  }

  const onRemoveImage = () => {
    const updatedQuizFile = { ...quizFile }
    updatedQuizFile.questions = [...updatedQuizFile.questions]
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