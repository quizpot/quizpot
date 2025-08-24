import Button, { ButtonVariant } from '@/components/ui/Button'
import { SanitizedQuestion } from '@/lib/misc/QuestionSanitizer'
import React from 'react'

const CurrentQuestionAnswer = ({ currentQuestion }: { currentQuestion: SanitizedQuestion }) => {
  const variants: ButtonVariant[] = ['red', 'yellow', 'green', 'blue', 'gray']

  if (currentQuestion.questionType === 'multipleChoice') {
    return (
      <section className='grid grid-cols-2 gap-4 grid-flow-row w-full'>
        {
          currentQuestion.choices.map((choice, index) => (
            <Button key={ index } className='text-2xl font-semibold p-16 w-full' variant={variants[index % variants.length]}>
              { choice.text }
            </Button>
          ))
        }
      </section>
    )
  }

  if (currentQuestion.questionType === 'trueFalse') {
    return (
      <section className='grid grid-cols-2 gap-4 grid-flow-row w-full'>
        <Button className='text-2xl font-semibold p-16 w-full' variant={'green'}>
          True
        </Button>
        <Button className='text-2xl font-semibold p-16 w-full' variant={'red'}>
          True
        </Button>
      </section>
    )
  }

  if (currentQuestion.questionType === 'shortAnswer') {
    return (
      <section className='flex items-center justify-center p-16 w-full'>
        <p className='text-2xl'>Send your answer!</p>
      </section>
    )
  }

  return (
    <></>
  )
}

export default CurrentQuestionAnswer