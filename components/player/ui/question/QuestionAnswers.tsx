import { SanitizedQuestion } from '@/lib/server/QuestionSanitizer'
import React from 'react'
import MultipleChoicePlayerAnswerButton from './multipleChoice/MultipleChoicePlayerAnswerButton'
import TrueFalsePlayerAnswerButton from './trueFalse/TrueFalsePlayerAsnwerButton'
import ShortAnswerPlayerInput from './shortAnswer/ShortAnswerPlayerInput'
import { colorKeys } from '@/lib/Colors'

const QuestionAnswers = ({ question }: { question: SanitizedQuestion }) => {
  if (question.questionType === 'multipleChoice') {
    return (
      <section className='grid grid-cols-2 gap-4 grid-flow-row w-full h-full p-4'>
        {
          question.choices.map((choice, index) => {
            return (
              <MultipleChoicePlayerAnswerButton 
                choice={ choice } 
                index={ index } 
                key={ index } 
                color={ colorKeys[index % 10] } 
              />
            )
          })
        }
      </section>
    )
  }

  if (question.questionType === 'trueFalse') {
    return (
      <section className='grid grid-cols-2 gap-4 grid-flow-row w-full h-full p-4'>
        <TrueFalsePlayerAnswerButton value={ true } color='red' />
        <TrueFalsePlayerAnswerButton value={ false } color='blue' />
      </section>
    )
  }

  if (question.questionType === 'shortAnswer') {
    return (
      <section className='flex flex-col gap-4 items-center justify-center w-full h-full p-4'>
        <ShortAnswerPlayerInput />
      </section>
    )
  }

  return (
    // @ts-expect-error may contain unknown type
    <div>Unknown question type: { question.questionType }</div>
  )
}

export default QuestionAnswers