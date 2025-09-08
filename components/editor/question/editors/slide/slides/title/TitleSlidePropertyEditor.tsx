import { useEditorCurrentQuestion } from '@/components/editor/providers/EditorCurrentQuestionProvider'
import { useEditorQuizFile } from '@/components/editor/providers/EditorQuizFileProvider'
import TextInput from '@/components/ui/TextInput'
import { TitleSlideLayout } from '@/lib/misc/QuizFile'
import React from 'react'

const TitleSlidePropertyEditor = () => {
  const { quizFile, setQuizFile } = useEditorQuizFile()
  const { currentQuestionIndex } = useEditorCurrentQuestion()
  const currentQuestion = quizFile.questions[currentQuestionIndex]

  if (!currentQuestion || currentQuestion.questionType !== 'slide' || currentQuestion.layout.slideType !== 'title') {
    return <></>
  }

  const properties = currentQuestion.layout as TitleSlideLayout

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value

    const updatedQuestions = [...quizFile.questions]
    const currentQuestionInArray = updatedQuestions[currentQuestionIndex]

    if (currentQuestionInArray.questionType === 'slide' && currentQuestionInArray.layout.slideType === 'title') {
      const updatedLayout = { ...currentQuestionInArray.layout, title }

      updatedQuestions[currentQuestionIndex] = {
        ...currentQuestionInArray,
        layout: updatedLayout,
      }

      setQuizFile({ ...quizFile, questions: updatedQuestions })
    }
  }

  const onSubtitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const subtitle = e.target.value

    const updatedQuestions = [...quizFile.questions]
    const currentQuestionInArray = updatedQuestions[currentQuestionIndex]

    if (currentQuestionInArray.questionType === 'slide' && currentQuestionInArray.layout.slideType === 'title') {
      const updatedLayout = { ...currentQuestionInArray.layout, subtitle }

      updatedQuestions[currentQuestionIndex] = {
        ...currentQuestionInArray,
        layout: updatedLayout,
      }

      setQuizFile({ ...quizFile, questions: updatedQuestions })
    }
  }

  return (
    <section className='w-96 max-h-[calc(100vh-58px)] h-[calc(100vh-58px)] flex flex-col gap-4 p-4'>
      <div className='flex flex-col gap-2'>
        <h1 className='text-xl'>Title</h1>
        <TextInput onChange={ onTitleChange } value={ properties.title } className='w-full' />
      </div>
      <div className='flex flex-col gap-2'>
        <h1 className='text-xl'>Subtitle</h1>
        <TextInput onChange={ onSubtitleChange } value={ properties.subtitle ? properties.subtitle : '' } className='w-full' />
      </div>
    </section>
  )
}

export default TitleSlidePropertyEditor