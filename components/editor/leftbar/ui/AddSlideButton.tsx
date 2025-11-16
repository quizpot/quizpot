import { DialogContext } from '@/components/ui/Dialog'
import React, { useContext } from 'react'
import { useEditorQuizFile } from '../../providers/EditorQuizFileProvider'
import Button from '@/components/ui/ButtonOld'
import { Question, SlideType } from '@/lib/QuizFile'

const AddSlideButton = ({ slideType }: { slideType: SlideType }) => {
  const { quizFile, setQuizFile } = useEditorQuizFile()
  const dialogContext = useContext(DialogContext)

  if (!dialogContext) {
    throw new Error("No dialog context found")
  }

  let title: string
  let question: Question

  switch (slideType) {
    case 'title':
      title = "Title Slide"
      question = {
        questionType: 'slide',
        layout: {
          slideType: 'title',
          title: "Title",
          subtitle: "Subtitle",
        }
      }
      break
    case 'titleImageText':
      title = "Title Image Text Slide"
      question = {
        questionType: 'slide',
        layout: {
          slideType: 'titleImageText',
          title: "Title",
          text: "This is the slide text!",
        }
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

export default AddSlideButton