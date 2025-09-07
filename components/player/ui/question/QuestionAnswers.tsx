import { SanitizedQuestion } from '@/lib/misc/QuestionSanitizer'
import React from 'react'
import MultipleChoicePlayerAnswerButton from './multipleChoice/MultipleChoicePlayerAnswerButton'
import TrueFalsePlayerAnswerButton from './trueFalse/TrueFalsePlayerAsnwerButton'
import { multipleChoiceVariants } from '@/lib/misc/colorVariants/MultipleChoiceVariants'
import { trueFalseVariants } from '@/lib/misc/colorVariants/TrueFalseVariants'

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
                variant={ multipleChoiceVariants[index % multipleChoiceVariants.length] } 
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
        <TrueFalsePlayerAnswerButton value={ true } variant={ trueFalseVariants[0] } />
        <TrueFalsePlayerAnswerButton value={ false } variant={ trueFalseVariants[1] } />
      </section>
    )
  }

  return (
    <div>Unknown question type: { question.questionType }</div>
  )
}

export default QuestionAnswers