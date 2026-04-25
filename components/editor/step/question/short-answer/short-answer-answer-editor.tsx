'use client'

import { useEditorStep } from '@/components/editor/providers/editor-step-provider'
import FancyButton from '@/components/ui/fancy-button'
import { ShortAnswerQuestion } from '@quizpot/quizcore'
import React from 'react'

const ShortAnswerAnswerEditor = ({ index }: { index: number }) => {
  const { data, setData } = useEditorStep<ShortAnswerQuestion>()
  const answer = data.answers[index]
  
  const updateAnswer = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value
    const newAnswers = [...data.answers]
    newAnswers[index] = text 
    setData({ ...data, answers: newAnswers })
  }

  return (
    <section className='flex gap-2 w-full'>
      <FancyButton className='flex p-0 w-full gap-2 items-center cursor-default hover:scale-100 active:scale-100'>
        <input
          type="text"
          className='text-xl w-full h-full p-4 bg-transparent outline-none placeholder:text-white/50 text-white'
          value={answer} 
          onChange={updateAnswer} 
          placeholder={`Accepted Answer ${index + 1}`}
        />
      </FancyButton>
    </section>
  )
}

export default ShortAnswerAnswerEditor