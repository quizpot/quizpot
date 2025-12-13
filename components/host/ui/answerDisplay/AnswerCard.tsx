import FancyCard from '@/components/ui/fancy-card'
import React from 'react'

const AnswerCard = ({ answers, answer, correct }: { answers: number, answer: string, correct: boolean }) => {
  return (
    <FancyCard color={ correct ? 'green' : 'gray' } className='relative flex gap-4 items-center justify-center p-8 px-16 text-2xl'>
      { answer } 
      <FancyCard color={ correct ? 'green' : 'gray' } className='absolute -top-4 -right-4 rounded-full'>
        { answers }
      </FancyCard>
    </FancyCard>
  )
}

export default AnswerCard