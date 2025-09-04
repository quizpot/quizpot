"use client"
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/Dialog'
import React, { useContext, useState } from 'react'
import { EditorQuizFileContext } from '../providers/EditorQuizFileContext'
import TextInput from '@/components/ui/TextInput'
import TextAreaInput from '@/components/ui/TextAreaInput'
import ColorInput from '@/components/ui/ColorInput'
import ImageInput from '@/components/ui/ImageInput'
import Button from '@/components/ui/Button'

const QuizSettings = ({ showTitle }: { showTitle?: boolean }) => {
  const quizFileContext = useContext(EditorQuizFileContext)
  
  if (!quizFileContext) {
    throw new Error("No quiz file context found")
  }

  const quiz = quizFileContext.quizFile
  const [background, setBackground] = useState<string>(quizFileContext.quizFile.theme.background)

  return (
    <Dialog>
      <div className={ showTitle ? 'text-lg font-semibold' : '' }>
        <DialogTrigger variant='gray'>
          { showTitle ? quiz.title : 'Settings' }
        </DialogTrigger>
      </div>
      <DialogContent>
        <DialogHeader title="Quiz Settings" />
        <section className="relative flex-grow overflow-y-auto">
          <div className='w-full h-full p-4 flex flex-col gap-4'>
            <div className='flex gap-4 items-center'>
              <h1 className='text-xl whitespace-nowrap'>Title</h1>
              <TextInput
                value={ quizFileContext.quizFile.title }
                onChange={(e) => { 
                  quizFileContext.setQuizFile({
                    ...quizFileContext.quizFile, // ✅ Creates a new object
                    title: e.target.value // ✅ Updates only the title
                  })
                }} 
              />
            </div>
            <div className='flex gap-4 items-center'>
              <h1 className='text-xl whitespace-nowrap'>Description</h1>
              <TextAreaInput
                value={ quizFileContext.quizFile.description }
                onChange={(e) => { 
                  quizFileContext.setQuizFile({
                    ...quizFileContext.quizFile,
                    description: e.target.value
                  })
                }} 
              />
            </div>
            <div className='flex gap-4 items-center'>
              <h1 className='text-xl whitespace-nowrap'>Background</h1>
              <ColorInput
                value={ quizFileContext.quizFile.theme.background }
                onChange={(e) => { 
                  setBackground(e.target.value)
                }} 
              />
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
                      setBackground(reader.result as string)
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
              <Button onClick={() => {
                quizFileContext.setQuizFile({
                  ...quizFileContext.quizFile,
                  theme: {
                    ...quizFileContext.quizFile.theme,
                    background: background
                  }
                })
              }} variant="primary">
                Apply
              </Button>
            </div>
          </div>
        </section>
      </DialogContent>
    </Dialog>
  )
}

export default QuizSettings