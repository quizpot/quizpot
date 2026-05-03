"use client"
import { Question } from '@quizpot/quizcore'
import { useEditorStep } from '../../providers/editor-step-provider'
import NumberInput from '@/components/ui/number-input'
import { Label } from '@/components/ui/label'

const QuestionDisplayTimeoutEditor = () => {
  const { data, setData } = useEditorStep<Question>()

  return (
    <section className='flex flex-col gap-2'>
      <Label>Display Timeout</Label>
      <NumberInput color='background' className='text-xl w-full text-center' min={5} max={30} value={ data.displayTime } onChange={ (e) => {
        setData({
          ...data,
          displayTime: Number(e.target.value)
        })
      } } />
    </section>
  )
}

export default QuestionDisplayTimeoutEditor