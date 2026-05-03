import { useEditorStep } from '@/components/editor/providers/editor-step-provider'
import BooleanInput from '@/components/ui/BooleanInput'
import FancyButton from '@/components/ui/fancy-button'
import TextInput from '@/components/ui/text-input'
import { colorIcons, Color } from '@/lib/colors'
import { MultipleChoiceQuestion } from '@quizpot/quizcore'
import { Check, X } from 'lucide-react'
import React from 'react'

const ChoiceEditor = ({ color, index }: { color: Color, index: number }) => {
  const { data, setData } = useEditorStep<MultipleChoiceQuestion>()
  const choice = data.choices[index]
  
  const Icon = colorIcons[color as keyof typeof colorIcons]

  const updateText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value
    const choices = [...data.choices]
    choices[index] = { ...choices[index], text }
    setData({ ...data, choices })
  }

  const updateCorrect = (correct: boolean) => {
    const choices = [...data.choices]
    choices[index] = { ...choices[index], correct }
    setData({ ...data, choices })
  }

  return (
    <section className='flex gap-2'>
      <FancyButton className='flex p-4 w-full gap-2 items-center' color={ color }>
        { Icon && <Icon size={ 32 } /> }
        <input
          type="text"
          className='text-2xl w-full'
          value={ choice.text } 
          onChange={ updateText } 
          placeholder={`Choice ${index + 1}`}
        />
      </FancyButton>
      <BooleanInput value={ choice.correct } onChange={ updateCorrect }>
        { choice.correct ? <Check /> : <X /> }
      </BooleanInput>
    </section>
  )
}

export default ChoiceEditor