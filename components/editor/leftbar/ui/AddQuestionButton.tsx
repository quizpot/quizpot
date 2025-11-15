import { DialogContext } from '@/components/ui/Dialog'
import React, { useContext } from 'react'
import { useEditorQuizFile } from '../../providers/EditorQuizFileProvider'
import Button from '@/components/ui/ButtonOld'
import { Question } from '@/lib/misc/QuizFile'

const AddQuestionButton = ({ questionType }: { questionType: string }) => {
  const { quizFile, setQuizFile } = useEditorQuizFile()
  const dialogContext = useContext(DialogContext)

  if (!dialogContext) {
    throw new Error("No dialog context found")
  }

  let title: string
  let question: Question

  switch (questionType) {
    case 'multipleChoice':
      title = "Multiple Choice Question"
      question = {
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
      }
      break
    case 'trueFalse':
      title = "True False Question"
      question = {
        questionType: 'trueFalse',
        question: "Do you like QuizPot?",
        timeLimit: 10,
        questionDisplayTime: 5,
        points: 'normalPoints',
        answer: true,
      }
      break
    case 'shortAnswer':
      title = "Short Answer Question"
      question = {
        questionType: 'shortAnswer',
        question: "What is the capital of France?",
        timeLimit: 10,
        questionDisplayTime: 5,
        points: 'normalPoints',
        answers: ["Paris"]
      }
      break
    default:
      throw new Error("Invalid question type")
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

export default AddQuestionButton