import { DialogContext } from '@/components/ui/dialog'
import React, { useContext } from 'react'
import { useEditorQuizFile } from '../../providers/EditorQuizFileProvider'
import { Question, SlideType } from '@/lib/QuizFile'
import { useTranslations } from 'next-intl'
import FancyButton from '@/components/ui/fancy-button'

const AddSlideButton = ({ slideType }: { slideType: SlideType }) => {
  const t = useTranslations('Slides')
  const { quizFile, setQuizFile } = useEditorQuizFile()
  const dialogContext = useContext(DialogContext)

  if (!dialogContext) {
    throw new Error("No dialog context found")
  }

  let question: Question

  switch (slideType) {
    case 'title':
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
      { t(slideType) }
    </FancyButton>
  )
}

export default AddSlideButton