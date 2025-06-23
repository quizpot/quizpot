"use client"
import { EditorCurrentQuestionContext, EditorQuizFileContext } from '@/app/editor/page'
import ImageInput from '@/components/ui/ImageInput'
import Image from 'next/image'
import React, { useContext } from 'react'

const QuestionImage = () => {
  const quizFileContext = useContext(EditorQuizFileContext)
  const currentQuestionIndexContext = useContext(EditorCurrentQuestionContext)

  if (!quizFileContext) {
    throw new Error("No quiz file context found")
  }

  if (!currentQuestionIndexContext) {
    throw new Error("No current question index context found")
  }

  const imageURL = quizFileContext.quizFile.questions[currentQuestionIndexContext.currentQuestionIndex].image

  if (imageURL === undefined || !imageURL) {
    return (
      <section className='my-16 flex items-center justify-center'>
        <div className='p-4 bg-white rounded min-w-sm max-w-10/12'>
          <ImageInput
            onChange={(e) => { 
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
                  const updatedQuizFile = { ...quizFileContext.quizFile }
                  updatedQuizFile.questions = [...updatedQuizFile.questions]
                  updatedQuizFile.questions[currentQuestionIndexContext.currentQuestionIndex] = {  
                    ...updatedQuizFile.questions[currentQuestionIndexContext.currentQuestionIndex],  
                    image: reader.result as string  
                  }

                  quizFileContext.setQuizFile(updatedQuizFile)
                }

                reader.onerror = (error) => {
                  console.error("Error converting file to base64:", error);
                }

                quizFileContext.setQuizFile({
                  ...quizFileContext.quizFile,
                  theme: {
                    ...quizFileContext.quizFile.theme,
                    background: e.target.value
                  }
                })
              } else {
                alert("Please select a valid file")
              }
            }} 
          />
        </div>
      </section>
    )
  }

  return (
    <section className='my-16 flex items-center justify-center'>
      <div className='p-4 bg-white rounded min-w-sm max-w-10/12 flex flex-col gap-2'>
        <Image alt='Question Image' src={ imageURL } width={854} height={480} />
        <ImageInput
          onChange={(e) => { 
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
                const updatedQuizFile = { ...quizFileContext.quizFile }
                updatedQuizFile.questions = [...updatedQuizFile.questions]
                updatedQuizFile.questions[currentQuestionIndexContext.currentQuestionIndex] = {  
                  ...updatedQuizFile.questions[currentQuestionIndexContext.currentQuestionIndex],  
                  image: reader.result as string  
                }

                quizFileContext.setQuizFile(updatedQuizFile)
              }

              reader.onerror = (error) => {
                console.error("Error converting file to base64:", error);
              }

              quizFileContext.setQuizFile({
                ...quizFileContext.quizFile,
                theme: {
                  ...quizFileContext.quizFile.theme,
                  background: e.target.value
                }
              })
            } else {
              alert("Please select a valid file")
            }
          }} 
        />
      </div>
    </section>
  )
}

export default QuestionImage