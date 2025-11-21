import FancyButton from '@/components/ui/fancy-button'
import { Color } from '@/lib/Colors'
import React from 'react'

const MultipleChoiceAnswerButton = ({ label, color }: { label: string, color: Color }) => {
  return (
    <FancyButton color={ color } className='w-full'>
      <div className='flex justify-between items-center w-full h-full p-8 text-4xl'>
        { label }
      </div>
    </FancyButton>
  )
}

export default MultipleChoiceAnswerButton