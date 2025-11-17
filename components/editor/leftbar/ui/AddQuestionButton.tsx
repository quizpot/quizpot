import { DialogContext } from '@/components/ui/dialog'
import React, { useContext } from 'react'
import { useEditorQuizFile } from '../../providers/EditorQuizFileProvider'
import { Question } from '@/lib/QuizFile'
import FancyButton from '@/components/ui/fancy-button'
import { useTranslations } from 'next-intl'

const AddQuestionButton = ({ questionType }: { questionType: string }) => {
  const t = useTranslations('Questions')
  const { quizFile, setQuizFile } = useEditorQuizFile()
  const dialogContext = useContext(DialogContext)

  if (!dialogContext) {
    throw new Error("No dialog context found")
  }

  let question: Question

  switch (questionType) {
    case 'multipleChoice':
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
    <FancyButton
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
      { t(questionType) }
    </FancyButton>
  )
}

export default AddQuestionButton