"use client"
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import FancyButton from '@/components/ui/fancy-button'
import { useEditorQuiz } from '../providers/EditorQuizProvider'
import { useState } from 'react'

const NewSlideDialog = () => {
  const { quiz, setQuiz } = useEditorQuiz()

  const [open, setOpen] = useState(false)

  const newSlide = (type: 'title' | 'content') => {
    let slide: any

    switch (type) {
      case 'title':
        slide = {
          slideType: 'title',
          title: 'Dogs and Cats'
        }
        break
      case 'content':
        slide = {
          slideType: 'titleImageText',
          title: 'What is the difference?',
        }
        break
    }

    setQuiz({ ...quiz, steps: [...quiz.steps || [], { data: slide, type: 'slide' }] })
    setOpen(false)
  }

  return (
    <Dialog open={ open } onOpenChange={ setOpen }>
      <DialogTrigger>
        New Slide
      </DialogTrigger>
      <DialogContent>
        <DialogHeader title='New Slide'/>
        <div className='p-4 flex flex-col gap-4'>
          <FancyButton onClick={ () => newSlide('title') }>
            Title
          </FancyButton>
          <FancyButton onClick={ () => newSlide('content') }>
            Content
          </FancyButton>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default NewSlideDialog