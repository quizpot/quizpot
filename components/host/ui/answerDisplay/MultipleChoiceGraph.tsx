import FancyCard from '@/components/ui/fancy-card'
import { Color } from '@/lib/Colors'
import React from 'react'
import { FaCheck } from 'react-icons/fa6'

const MultipleChoiceGraph = ({ color, answers, maxAnswers, correctAnswer }: { color: Color, answers: number, maxAnswers: number, correctAnswer: boolean }) => {
  const columnHeight = answers / maxAnswers * 100 

  return (
    <div className={'h-full flex flex-col justify-end gap-4 ' + (correctAnswer ? 'opacity-100' : 'opacity-60') }>
      <FancyCard color={ color } className='p-12' style={{ height: columnHeight + '%' }} />
      <FancyCard color={ color } className='flex gap-4 items-centers justify-center'>
        { answers }
        { 
          correctAnswer ? 
            <FaCheck size={ 20 } />
            : 
            null 
        }
      </FancyCard>
    </div>
  )
}

export default MultipleChoiceGraph