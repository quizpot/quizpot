import React from 'react'
import MultipleChoiceAnswerButton from './answerButtons/MultipleChoiceAnswerButton'
import MultipleChoiceAnswerButtonWithAnswer from './answerButtons/MultipleChoiceAnswerButtonWithAnswer'
import { Question } from '@/lib/QuizFile'
import { colorKeys } from '@/lib/Colors'
import FancyCard from '@/components/ui/fancy-card'
import AnswerCard from './answerDisplay/AnswerCard'
import { useHostLobbyState } from '@/components/providers/HostLobbyStateProvider'

const CurrentQuestionAnswers = ({ currentQuestion, showAnswers }: { currentQuestion: Question, showAnswers?: boolean }) => {
  const hostLobbyState = useHostLobbyState().hostLobbyState

  if (currentQuestion.questionType === 'multipleChoice') {
    return (
      <section className='grid grid-cols-2 gap-4 grid-flow-row w-full'>
        {
          currentQuestion.choices.map((choice, index) => {
            if (showAnswers) {
              return <MultipleChoiceAnswerButtonWithAnswer 
                key={ index } 
                label={ choice.text } 
                color={ colorKeys[index % 10] } 
                isCorrect={ choice.correct } 
              />
            } else {
              return <MultipleChoiceAnswerButton 
                key={ index } 
                label={ choice.text } 
                color={ colorKeys[index % 10] } 
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
                label="True"
                color='red'
                isCorrect={ currentQuestion.answer } 
              />
              <MultipleChoiceAnswerButtonWithAnswer 
                label="False"
                color='blue'
                isCorrect={ !currentQuestion.answer } 
              />
            </>
            :
            <>
              <MultipleChoiceAnswerButton label={ "True" } color='red' />
              <MultipleChoiceAnswerButton label={ "False" } color='blue' />
            </>
        }
      </section>
    )
  }

  if (currentQuestion.questionType === 'shortAnswer') {
    if (showAnswers) {
      const answerCounter: number[] = []

      hostLobbyState?.answers.filter(a => a.isCorrect).map((answer, index) => {
        answerCounter[index] = answerCounter[index] + 1 || 1
      })

      return (
        <div className='flex items-center justify-center p-8 gap-4'>
          {
            currentQuestion.answers.map((answer, index) => {
              if (answerCounter[index] !== 0) return null

              return (
                <AnswerCard
                  key={ index }
                  answer={ answer }
                  answers={ answerCounter[index] }
                  correct={ true }
                />
              )
            })
          }
        </div>
      )
    }

    return (
      <div className='flex items-center justify-center p-8 gap-4'>
        <FancyCard color="white" className='flex items-center justify-center p-8 mx-auto text-2xl'>
          Send your answer!
        </FancyCard>
      </div>
    )
  }

  return (
    <></>
  )
}

export default CurrentQuestionAnswers