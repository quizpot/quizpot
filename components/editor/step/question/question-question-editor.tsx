"use client"
import TextInput from '@/components/ui/text-input'
import { Question } from '@quizpot/quizcore'
import { useEditorStep } from '../../providers/editor-step-provider'

const QuestionQuestionEditor = () => {
  const { data, setData } = useEditorStep<Question>()

  return (
    <TextInput color='background' className='text-2xl w-full text-center' value={ data.question } onChange={ (e) => {
      setData({
        ...data,
        question: e.target.value
      })
    } } />
  )
}

export default QuestionQuestionEditor