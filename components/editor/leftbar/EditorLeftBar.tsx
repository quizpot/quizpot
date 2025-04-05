"use client"
import { EditorQuizFileContext } from '@/app/editor/page'
import React, { useContext } from 'react'
import QuestionCard from '../question/QuestionCard'
import { Dialog, DialogContent, DialogContext, DialogHeader, DialogTrigger } from '@/components/ui/Dialog'
import Button from '@/components/ui/Button'
import { Question } from '@/lib/QuizFile'
import Link from 'next/link'
import { version } from '@/package.json'

const EditorLeftBar = () => {
  const quizFileContext = useContext(EditorQuizFileContext)
  
  if (!quizFileContext) {
    throw new Error("No quiz file context found")
  }

  return (
    <section className='min-w-52 w-52 h-[calc(100vh_-_56px)] flex flex-col box-border'>
      <div className='flex flex-col gap-2 overflow-y-auto h-auto'>
        {
          quizFileContext.quizFile.questions.map((question, index) => {
            return (
              <QuestionCard key={index} question={question} index={index} />
            )
          })
        }
      </div>
      <div className='flex flex-col gap-4 p-4'>
        <Dialog>
          <DialogTrigger>
            New Question
          </DialogTrigger>
          <DialogContent>
            <DialogHeader title="Choose Type" />
            <section className="relative flex-grow overflow-y-auto">
              <div className='w-full h-full p-4 flex flex-col gap-4'>
                <AddQuestionButton 
                  title="Multiple Choice Question" 
                  question={{
                    questionType: 'multipleChoice',
                    question: "What is the color of the sky?",
                    timeLimit: 30,
                    points: 'normalPoints',
                    choices: [
                      {
                        text: "Red",
                        correct: false
                      },
                      {
                        text: "Blue",
                        correct: true
                      },
                      {
                        text: "Yellow",
                        correct: false
                      },
                      {
                        text: "Green",
                        correct: false
                      }
                    ]
                  }}
                />
                <AddQuestionButton 
                  title="True False Question" 
                  question={{
                    questionType: 'trueFalse',
                    question: "Do you like QuizPot?",
                    timeLimit: 10,
                    points: 'normalPoints',
                    answer: true,
                  }}
                />
              </div>
            </section>
          </DialogContent>
        </Dialog>
        <div className='text-sm text-center'>
          <Link href="https://github.com/kragleh/quizpot">
            {new Date().getFullYear() === 2025 ? '2025 ' : `${new Date().getFullYear()} - 2025 `} © QuizPot
          </Link>
          {' '} v{ version } by{' '}
          <Link href="https://kragleh.com" className='underline underline-offset-2 decoration-[#F90]'>
            kragleh.com
          </Link>
        </div>
      </div>
    </section>
  )
}

const AddQuestionButton = ({ title, question }: { title: string, question: Question }) => {
  const quizFileContext = useContext(EditorQuizFileContext)
  const dialogContext = useContext(DialogContext)

  if (!quizFileContext) {
    throw new Error("No quiz file context found")
  }

  if (!dialogContext) {
    throw new Error("No dialog context found")
  }

  return (
    <Button
      variant='secondary'
      onClick={() => {
        quizFileContext.setQuizFile({
          ...quizFileContext.quizFile,
          questions: [
            ...quizFileContext.quizFile.questions,
            question
          ],
        })
        dialogContext.setOpened(false)
      }}
    >
      { title }
    </Button>
  )
}

export default EditorLeftBar