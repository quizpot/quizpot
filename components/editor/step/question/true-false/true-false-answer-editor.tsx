import { useEditorStep } from '@/components/editor/providers/editor-step-provider'
import BooleanInput from '@/components/ui/BooleanInput'
import FancyButton from '@/components/ui/fancy-button'
import { Color, colorIcons } from '@/lib/colors'
import { TrueFalseQuestion } from '@quizpot/quizcore'
import { Check, X } from 'lucide-react'
import React from 'react'

const TrueFalseAnswerEditor = ({ color, index }: { color: Color, index: number }) => {
  const { data, setData } = useEditorStep<TrueFalseQuestion>()
  
  const Icon = colorIcons[color as keyof typeof colorIcons]

  const updateLabel = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value
    const labels = [...data.labels]
    labels[index] = text
    setData({ ...data, labels })
  }

  const updateAnswer = (answer: boolean) => {
    setData({ ...data, answer })
  }

  return (
    <section className='flex gap-2 w-full'>
      <FancyButton className='flex p-4 w-full gap-4 items-center' color={ color }>
        { Icon && <Icon size={ 32 } /> }
        <input
          type="text"
          className='text-2xl w-full'
          value={ data.labels[index] } 
          onChange={ updateLabel } 
          placeholder={`Choice ${index + 1}`}
        />
      </FancyButton>
      <BooleanInput value={ index === 0 ? data.answer : !data.answer } onChange={ () => updateAnswer(!data.answer) }>
        { (index === 0) && (data.answer ? <Check /> : <X />) }
        { (index === 1) && (data.answer ? <X /> : <Check />) }
      </BooleanInput>
    </section>
  )
}

export default TrueFalseAnswerEditor