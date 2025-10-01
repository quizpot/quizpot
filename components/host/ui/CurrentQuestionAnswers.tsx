import React from 'react'
import MultipleChoiceAnswerButton from './answerButtons/MultipleChoiceAnswerButton'
import MultipleChoiceAnswerButtonWithAnswer from './answerButtons/MultipleChoiceAnswerButtonWithAnswer'
import { Question } from '@/lib/misc/QuizFile'
import { multipleChoiceVariants } from '@/lib/client/colorVariants/MultipleChoiceVariants'
import { trueFalseVariants } from '@/lib/client/colorVariants/TrueFalseVariants'
import Card from '@/components/ui/Card'

const CurrentQuestionAnswers = ({ currentQuestion, showAnswers }: { currentQuestion: Question, showAnswers?: boolean }) => {
  if (currentQuestion.questionType === 'multipleChoice') {
    return (
      <section className='grid grid-cols-2 gap-4 grid-flow-row w-full'>
        {
          currentQuestion.choices.map((choice, index) => {
            if (showAnswers) {
              return <MultipleChoiceAnswerButtonWithAnswer 
                key={ index } 
                label={ choice.text } 
                variant={ multipleChoiceVariants[index % multipleChoiceVariants.length] } 
                isCorrect={ choice.correct } 
              />
            } else {
              return <MultipleChoiceAnswerButton 
                key={ index } 
                label={ choice.text } 
                variant={ multipleChoiceVariants[index % multipleChoiceVariants.length] }
              />
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
              <MultipleChoiceAnswerButtonWithAnswer 
                label={ "True" } 
                variant={ trueFalseVariants[0] } 
                isCorrect={ currentQuestion.answer } 
              />
              <MultipleChoiceAnswerButtonWithAnswer 
                label={ "False" } 
                variant={ trueFalseVariants[1] }
                isCorrect={ !currentQuestion.answer } 
              />
            </>
            :
            <>
              <MultipleChoiceAnswerButton label={ "True" } variant={ trueFalseVariants[0] } />
              <MultipleChoiceAnswerButton label={ "False" } variant={ trueFalseVariants[1] } />
            </>
        }
      </section>
    )
  }

  if (currentQuestion.questionType === 'shortAnswer') {
    return (
      <Card className='flex items-center justify-center p-16 w-full text-2xl'>
        Send your answer!
      </Card>
    )
  }

  return (
    <></>
  )
}

export default CurrentQuestionAnswers