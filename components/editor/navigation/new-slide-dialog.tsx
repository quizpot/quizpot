"use client"
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import FancyButton from '@/components/ui/fancy-button'
import { useEditorQuiz } from '../providers/editor-quiz-provider'
import { useState } from 'react'
import { SlideLayout } from '@quizpot/quizcore'

const NewSlideDialog = () => {
  const { quiz, setQuiz } = useEditorQuiz()

  const [open, setOpen] = useState(false)

  const newSlide = (type: 'title' | 'content') => {
    let slide: SlideLayout

    switch (type) {
      case 'title':
        slide = {
          slideType: 'title',
          title: 'Dogs and Cats'
        }
        break
      case 'content':
        slide = {
          slideType: 'content',
          title: 'What is the difference?',
          text: ''
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