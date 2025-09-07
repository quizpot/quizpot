import { colorStyles, ColorVariants } from '@/lib/misc/colorVariants/ColorVariants'
import React from 'react'
import { FaCheck } from 'react-icons/fa6'

const MultipleChoiceGraph = ({ variant, answers, maxAnswers, correctAnswer }: { variant: ColorVariants, answers: number, maxAnswers: number, correctAnswer: boolean }) => {
  const { parent: parentClassName, child: childClassName } = colorStyles[variant]

  const columnHeight = answers / maxAnswers * 100 

  return (
    <div className='h-full flex flex-col justify-end'>
      <div className={`
        rounded-t w-full p-2
      ` + childClassName } style={{ height: columnHeight + '%' }}>
      </div>
      <div className={'rounded-b px-4 py-1 flex items-center justify-center gap-2 w-32 ' + parentClassName}>
        { answers }
        { 
          correctAnswer ? 
            <FaCheck size={16} />
            : 
            null 
        }
      </div>
    </div>
  )
}

export default MultipleChoiceGraph