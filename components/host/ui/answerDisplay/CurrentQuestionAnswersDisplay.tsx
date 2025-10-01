import { Question } from '@/lib/misc/QuizFile'
import { Answer } from '@/lib/server/managers/LobbyManager'
import React from 'react'
import MultipleChoiceGraph from './MultipleChoiceGraph'
import { multipleChoiceVariants } from '@/lib/client/colorVariants/MultipleChoiceVariants'
import { trueFalseVariants } from '@/lib/client/colorVariants/TrueFalseVariants'
import AnswerCard from './AnswerCard'

const CurrentQuestionAnswersDisplay = ({ currentQuestion, answers }: { currentQuestion: Question, answers: Answer[] }) => {
  if (currentQuestion.questionType === 'multipleChoice') {
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
              <MultipleChoiceGraph 
                key={ index } 
                variant={ multipleChoiceVariants[index % multipleChoiceVariants.length] }
                answers={ pillar.length } 
                maxAnswers={ maxAnswers } 
                correctAnswer={ currentQuestion.choices[index].correct } 
              />
            )
          }) 
        }
      </div>
    )
  }

  if (currentQuestion.questionType === 'trueFalse') {
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
              <MultipleChoiceGraph key={ index } variant={ trueFalseVariants[index] } answers={ pillar.length } maxAnswers={ maxAnswers } correctAnswer={ index === correctPillarIndex } />
            )
          }) 
        }
      </div>
    )
  }

  if (currentQuestion.questionType === 'shortAnswer') {
    const data = new Map<string, { count: number, correct: boolean }>()

    answers.forEach(answer => {
      if (answer.answer.answerType !== 'shortAnswer') return
      const currentCount = data.get(answer.answer.answer)?.count || 0
      data.set(answer.answer.answer, { count: (currentCount + 1), correct: answer.isCorrect})
    })

    return (
      <div className='flex gap-8 items-center justify-center flex-wrap h-full'>
        { 
          Array.from(data.entries()).map(([answerText, obj]) => {
            return (
              <AnswerCard
                key={ answerText }
                answers={ obj.count }
                answer={ answerText }
                correct={ obj.correct }
              />
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