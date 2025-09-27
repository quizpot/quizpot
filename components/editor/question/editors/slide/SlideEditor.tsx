import { useEditorCurrentQuestion } from '@/components/editor/providers/EditorCurrentQuestionProvider'
import { useEditorQuizFile } from '@/components/editor/providers/EditorQuizFileProvider'
import { getBackgroundStyles } from '@/lib/client/BackgroundStyles'
import { SlideQuestion } from '@/lib/misc/QuizFile'
import React from 'react'
import TitleSlidePreview from './slides/title/TitleSlidePreview'
import Button from '@/components/ui/Button'
import TitleSlidePropertyEditor from './slides/title/TitleSlidePropertyEditor'
import TitleImageTextSlidePreview from './slides/titleImageText/TitleImageTextSlidePreview'
import TitleImageTextSlidePropertyEditor from './slides/titleImageText/TitleImageTextSlidePropertyEditor'

const SlideEditor = () => {
  const { quizFile } = useEditorQuizFile()
  const { currentQuestionIndex } = useEditorCurrentQuestion()
  const currentQuestion = quizFile.questions[currentQuestionIndex] as SlideQuestion

  let preview: React.JSX.Element | undefined = undefined
  let propertyEditor: React.JSX.Element | undefined = undefined

  if (currentQuestion.layout.slideType === 'title') {
    preview = <TitleSlidePreview />
    propertyEditor = <TitleSlidePropertyEditor />
  }

  if (currentQuestion.layout.slideType === 'titleImageText') {
    preview = <TitleImageTextSlidePreview />
    propertyEditor = <TitleImageTextSlidePropertyEditor />
  }

  if (!preview) {
    return (
      <section className='h-[calc(100vh-58px)] w-full overflow-hidden'>
        <div className='h-full w-full flex flex-col items-center justify-center p-4' style={ getBackgroundStyles(quizFile.theme.background) }>
          <Button variant='gray' className='text-2xl w-full text-center'>
            Unsupported slide type: <span className='font-semibold'>{ currentQuestion.layout.slideType }</span>
          </Button>
        </div>
      </section>
    )
  }

  return (
    <section className='max-h-[calc(100vh-58px)] h-[calc(100vh-58px)] w-full overflow-hidden flex'>
      <div className='h-full w-full' style={ getBackgroundStyles(quizFile.theme.background) }>
        { preview }
      </div>
      { propertyEditor }
    </section>
  )
}

export default SlideEditor