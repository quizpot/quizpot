"use client"
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import FancyButton from '@/components/ui/fancy-button'
import { Question } from '@quizpot/quizcore'
import { useEditorQuiz } from '../providers/editor-quiz-provider'
import { useState } from 'react'

const NewQuestionDialog = () => {
  const { quiz, setQuiz } = useEditorQuiz()

  const [open, setOpen] = useState(false)

  const newQuestion = (type: Question['questionType']) => {
    let question: Question

    switch (type) {
      case 'multipleChoice':
        question = {
          questionType: 'multipleChoice',
          question: 'What dog breed is this?',
          displayTime: 5,
          matchAll: false,
          points: 'normalPoints',
          timeLimit: 20,
          choices: []
        }
        break
      case 'trueFalse':
        question = {
          questionType: 'trueFalse',
          question: 'Can cats bark?',
          answer: true,
          displayTime: 5,
          labels: ['True', 'False'],
          points: 'normalPoints',
          timeLimit: 20
        }
        break
      case 'shortAnswer':
        question = {
          questionType: 'shortAnswer',
          question: 'What cat is on the picture?',
          answers: [],
          displayTime: 5,
          points: 'normalPoints',
          timeLimit: 20
        }
        break
    }

    setQuiz({ ...quiz, steps: [...quiz.steps || [], { data: question, type: 'question' }] })
    setOpen(false)
  }

  return (
    <Dialog open={ open } onOpenChange={ setOpen }>
      <DialogTrigger>
        New Question
      </DialogTrigger>
      <DialogContent>
        <DialogHeader title='New Question'/>
        <div className='p-4 flex flex-col gap-4'>
          <FancyButton onClick={ () => newQuestion('multipleChoice') }>
            Multiple Choice
          </FancyButton>
          <FancyButton onClick={ () => newQuestion('trueFalse') }>
            True/False
          </FancyButton>
          <FancyButton onClick={ () => newQuestion('shortAnswer') }>
            Short Answer
          </FancyButton>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default NewQuestionDialog