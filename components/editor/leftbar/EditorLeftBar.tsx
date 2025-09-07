"use client"
import React, { useContext } from 'react'
import QuestionCard from '../question/QuestionCard'
import { Dialog, DialogContent, DialogContext, DialogHeader, DialogTrigger } from '@/components/ui/Dialog'
import Button from '@/components/ui/Button'
import { Question } from '@/lib/misc/QuizFile'
import Link from 'next/link'
import pjson from '@/package.json'
import { useEditorQuizFile } from '../providers/EditorQuizFileProvider'

const EditorLeftBar = () => {
  const { quizFile } = useEditorQuizFile()

  return (
    <section className='min-w-52 w-52 h-[calc(100vh_-_56px)] flex flex-col box-border'>
      <div className='flex flex-col gap-2 overflow-y-auto h-auto'>
        {
          quizFile.questions.map((question, index) => {
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
                    questionDisplayTime: 5,
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
                    questionDisplayTime: 5,
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
          {' '} v{ pjson.version } by{' '}
          <Link href="https://kragleh.com" className='underline underline-offset-2 decoration-[#F90]'>
            kragleh.com
          </Link>
        </div>
      </div>
    </section>
  )
}

const AddQuestionButton = ({ title, question }: { title: string, question: Question }) => {
  const { quizFile, setQuizFile } = useEditorQuizFile()
  const dialogContext = useContext(DialogContext)

  if (!dialogContext) {
    throw new Error("No dialog context found")
  }

  return (
    <Button
      variant='gray'
      onClick={() => {
        setQuizFile({
          ...quizFile,
          questions: [
            ...quizFile.questions,
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