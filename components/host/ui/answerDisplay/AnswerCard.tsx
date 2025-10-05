import Card from '@/components/ui/Card'
import React from 'react'

const AnswerCard = ({ answers, answer, correct }: { answers: number, answer: string, correct: boolean }) => {
  return (
    <Card variant={ correct ? 'green' : 'gray'} className='flex items-center justify-center p-8 w-full text-2xl'>
      { answer } - { answers }
    </Card>
  )
}

export default AnswerCard