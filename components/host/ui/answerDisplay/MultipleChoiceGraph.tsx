import React from 'react'
import { FaCheck } from 'react-icons/fa6'

export type MultipleChoiceGraphVariant =
  'red' |
  'blue' |
  'yellow' |
  'green'

const MultipleChoiceGraph = ({ variant, answers, maxAnswers, correctAnswer }: { variant: MultipleChoiceGraphVariant, answers: number, maxAnswers: number, correctAnswer: boolean }) => {
  const variants = {
    'red': { parent: 'bg-red-600 text-white', child: 'bg-red-500' },
    'blue': { parent: 'bg-blue-600 text-white', child: 'bg-blue-500' },
    'yellow': { parent: 'bg-yellow-600 text-white', child: 'bg-yellow-500' },
    'green': { parent: 'bg-green-600 text-white', child: 'bg-green-500' },
  }

  const { parent: parentClassName, child: childClassName } = variants[variant]

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