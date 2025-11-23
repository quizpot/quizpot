import FancyCard from '@/components/ui/fancy-card'
import React from 'react'

const AnswerCard = ({ answers, answer, correct }: { answers: number, answer: string, correct: boolean }) => {
  return (
    <FancyCard color={ correct ? 'green' : 'gray'} className='flex items-center justify-center p-8 w-full text-2xl'>
      { answer } - { answers }
    </FancyCard>
  )
}

export default AnswerCard