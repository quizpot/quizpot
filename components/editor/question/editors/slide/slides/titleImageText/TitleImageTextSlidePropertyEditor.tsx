import { useEditorCurrentQuestion } from '@/components/editor/providers/EditorCurrentQuestionProvider'
import { useEditorQuizFile } from '@/components/editor/providers/EditorQuizFileProvider'
import ImageInput from '@/components/ui/ImageInput'
import TextAreaInput from '@/components/ui/TextAreaInput'
import TextInput from '@/components/ui/TextInput'
import { useToast } from '@/components/ui/Toaster'
import { TitleImageTextSlideLayout } from '@/lib/misc/QuizFile'
import React from 'react'

const TitleImageTextSlidePropertyEditor = () => {
  const addToast = useToast()
  const { quizFile, setQuizFile } = useEditorQuizFile()
  const { currentQuestionIndex } = useEditorCurrentQuestion()
  const currentQuestion = quizFile.questions[currentQuestionIndex]

  if (!currentQuestion || currentQuestion.questionType !== 'slide' || currentQuestion.layout.slideType !== 'titleImageText') {
    return <></>
  }

  const properties = currentQuestion.layout as TitleImageTextSlideLayout

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value

    const updatedQuestions = [...quizFile.questions]
    const currentQuestionInArray = updatedQuestions[currentQuestionIndex]

    if (currentQuestionInArray.questionType === 'slide' && currentQuestionInArray.layout.slideType === 'titleImageText') {
      const updatedLayout = { ...currentQuestionInArray.layout, title }

      updatedQuestions[currentQuestionIndex] = {
        ...currentQuestionInArray,
        layout: updatedLayout,
      }

      setQuizFile({ ...quizFile, questions: updatedQuestions })
    }
  }

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target?.files

    if (!files || files.length === 0) {
      alert("Please select a valid file")
      return
    }

    const file = files[0]
    
    if (file) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        const img = reader.result as string

        const updatedQuestions = [...quizFile.questions]
        const currentQuestionInArray = updatedQuestions[currentQuestionIndex]

        if (currentQuestionInArray.questionType === 'slide' && currentQuestionInArray.layout.slideType === 'titleImageText') {
          const updatedLayout = { ...currentQuestionInArray.layout, image: img }

          updatedQuestions[currentQuestionIndex] = {
            ...currentQuestionInArray,
            layout: updatedLayout,
          }

          setQuizFile({ ...quizFile, questions: updatedQuestions })
        }
      }

      reader.onerror = (error) => {
        addToast({ message: 'Error converting file to base64: ' + error, type: 'error' })
      }
    } else {
      addToast({ message: 'Please select a valid file', type: 'error' })
    }
  }

  const onTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value

    const updatedQuestions = [...quizFile.questions]
    const currentQuestionInArray = updatedQuestions[currentQuestionIndex]

    if (currentQuestionInArray.questionType === 'slide' && currentQuestionInArray.layout.slideType === 'titleImageText') {
      const updatedLayout = { ...currentQuestionInArray.layout, text }

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
        <h1 className='text-xl'>Image</h1>
        <ImageInput onChange={ onImageChange } />
      </div>
      <div className='flex flex-col gap-2'>
        <h1 className='text-xl'>Text</h1>
        <TextAreaInput onChange={ onTextChange } value={ properties.text } className='w-full' />
      </div>
    </section>
  )
}

export default TitleImageTextSlidePropertyEditor