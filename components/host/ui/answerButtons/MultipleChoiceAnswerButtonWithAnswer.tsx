import Button from '@/components/ui/ButtonOld'
import { ColorVariants } from '@/lib/client/colorVariants/ColorVariants'
import React from 'react'
import { FaCheck, FaX } from 'react-icons/fa6'

const MultipleChoiceAnswerButtonWithAnswer = ({ label, variant, isCorrect }: { label: string, variant: ColorVariants, isCorrect: boolean }) => {
  return (
    <div className={ (isCorrect ? 'opacity-100' : 'opacity-60') + ' w-full h-full' }>
      <Button variant={ variant }>
        <div className='flex justify-between items-center w-full h-full p-8 text-4xl'>
          { label }
          { 
            isCorrect ? 
              <FaCheck size={32} /> 
              :
              <FaX size={32} />
          }
        </div>
      </Button>
    </div>
  )
}

export default MultipleChoiceAnswerButtonWithAnswer