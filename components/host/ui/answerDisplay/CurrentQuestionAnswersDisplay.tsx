import { Question } from '@/lib/misc/QuizFile'
import { Answer } from '@/lib/server/managers/LobbyManager'
import React from 'react'
import MultipleChoiceGraph, { MultipleChoiceGraphVariant } from './MultipleChoiceGraph'

const CurrentQuestionAnswersDisplay = ({ currentQuestion, answers }: { currentQuestion: Question, answers: Answer[] }) => {
  if (currentQuestion.questionType === 'multipleChoice') {
    const variants: MultipleChoiceGraphVariant[] = ['red', 'blue', 'yellow', 'green']
    const pillars: Answer[][] = []
    
    currentQuestion.choices.forEach(() => { pillars.push([]) })

    answers.forEach(answer => {
      if (answer.answer.answerType !== 'multipleChoice') return console.log("Answer is not multiple choice")
      pillars[answer.answer.choiceIndex].push(answer)
    })

    const maxAnswers = Math.max(...pillars.map(pillar => pillar.length))

    return (
      <div className='flex gap-8 h-full'>
        { 
          pillars.map((pillar, index) => {
            return (
              <MultipleChoiceGraph key={ index } variant={ variants[index % variants.length] } answers={ pillar.length } maxAnswers={ maxAnswers } correctAnswer={ currentQuestion.choices[index].correct } />
            )
          }) 
        }
      </div>
    )
  }

  if (currentQuestion.questionType === 'trueFalse') {
    const variants: MultipleChoiceGraphVariant[] = ['red', 'blue']
    const pillars: Answer[][] = [[], []]

    answers.forEach(answer => {
      if (answer.answer.answerType !== 'trueFalse') return console.log("Answer is not multiple choice")
      
      if (answer.answer.answer) {
        pillars[0].push(answer)
      } else {
        pillars[1].push(answer)
      }
    })

    const maxAnswers = Math.max(...pillars.map(pillar => pillar.length))
    const correctPillarIndex = currentQuestion.answer ? 0 : 1

    return (
      <div className='flex gap-8 h-full'>
        { 
          pillars.map((pillar, index) => {
            return (
              <MultipleChoiceGraph key={ index } variant={ variants[index % variants.length] } answers={ pillar.length } maxAnswers={ maxAnswers } correctAnswer={ index === correctPillarIndex } />
            )
          }) 
        }
      </div>
    )
  }

  return (
    <div>
      Unsupported question type
    </div>
  )
}

export default CurrentQuestionAnswersDisplay