import { ButtonVariant } from '@/components/ui/Button'
import React from 'react'
import MultipleChoiceAnswerButton from './answerButtons/MultipleChoiceAnswerButton'
import MultipleChoiceAnswerButtonWithAnswer from './answerButtons/MultipleChoiceAnswerButtonWithAnswer'
import { Question } from '@/lib/misc/QuizFile'

const CurrentQuestionAnswers = ({ currentQuestion, showAnswers }: { currentQuestion: Question, showAnswers?: boolean }) => {
  const variants: ButtonVariant[] = ['red', 'blue', 'yellow', 'green', 'gray']

  if (currentQuestion.questionType === 'multipleChoice') {
    return (
      <section className='grid grid-cols-2 gap-4 grid-flow-row w-full'>
        {
          currentQuestion.choices.map((choice, index) => {
            if (showAnswers) {
              return <MultipleChoiceAnswerButtonWithAnswer key={ index } label={ choice.text } variant={variants[index % variants.length]} isCorrect={ choice.correct } />
            } else {
              return <MultipleChoiceAnswerButton key={ index } label={ choice.text } variant={variants[index % variants.length]} />
            }
          })
        }
      </section>
    )
  }

  if (currentQuestion.questionType === 'trueFalse') {
    return (
      <section className='grid grid-cols-2 gap-4 grid-flow-row w-full'>
        {
          showAnswers ?
            <>
              <MultipleChoiceAnswerButtonWithAnswer label={ "True" } variant={ 'red' } isCorrect={ currentQuestion.answer } />
              <MultipleChoiceAnswerButtonWithAnswer label={ "False" } variant={ 'blue' } isCorrect={ !currentQuestion.answer } />
            </>
            :
            <>
              <MultipleChoiceAnswerButton label={ "True" } variant={ 'red' } />
              <MultipleChoiceAnswerButton label={ "False" } variant={ 'blue' } />
            </>
        }
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

export default CurrentQuestionAnswers