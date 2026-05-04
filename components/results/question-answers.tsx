"use client"
import FancyCard from '@/components/ui/fancy-card'
import StepDisplay from './result/step-display'
import { useResultCurrentStep } from './providers/result-current-step-provider'
import { useResult } from './providers/result-provider'
import { Question } from '@quizpot/quizcore'
import { Check, X } from 'lucide-react'
import { Color, colorKeys } from '@/lib/colors'

const QuestionAnswers = () => {
  const { currentStep } = useResultCurrentStep()
  const { result } = useResult()
  
  const step = result.quiz.steps[currentStep!].data as Question
  const answers = result.answers[currentStep!]

  return (
    <StepDisplay className='flex flex-col gap-4 h-full w-full p-4'>
      <FancyCard className='text-center text-4xl font-semibold w-full py-4 px-4 shrink-0'>
        {step.question}
      </FancyCard>
      <div className='flex flex-col gap-4 overflow-y-auto pb-4'>
        {
          answers.length === 0 ? (
            <FancyCard className='text-center text-xl opacity-50 py-10'>
              No answers submitted
            </FancyCard>
          ) : (
            answers.map((a, i) => {
              let displayAnswer: string | number | boolean = ""
              const sub = a.submission
              let answerColor: Color = i % 2 ? 'background' : 'foreground'

              if (step.questionType === 'multipleChoice' && sub.type === 'multipleChoice') {
                const selectedIndices = sub.choices
                displayAnswer = selectedIndices
                  .map(index => step.choices[index]?.text)
                  .filter(Boolean)
                  .join(', ')
                answerColor = colorKeys[sub.choices[0]]
              } 
              else if (step.questionType === 'trueFalse' && sub.type === 'trueFalse') {
                displayAnswer = sub.answer ? "True" : "False"
                answerColor = sub.answer ? 'green' : 'red'
              } 
              else if (step.questionType === 'shortAnswer' && sub.type === 'shortAnswer') {
                displayAnswer = sub.answer
              }

              const player = result.players.find(p => p.id === a.playerId)

              return (
                <div key={i} className='flex gap-4 w-full'>
                  <FancyCard color={i % 2 ? 'background' : 'foreground'} className='text-2xl font-semibold w-full py-4 px-4'>
                    {player?.name ?? "Unknown Player"}
                  </FancyCard>

                  <FancyCard color={answerColor} className='text-2xl font-semibold py-4 px-4 min-w-[200px]'>
                    {displayAnswer.toString()}
                  </FancyCard>

                  <FancyCard color={i % 2 ? 'background' : 'foreground'} className='text-2xl font-semibold py-4 px-4'>
                    {a.pointsAwarded}
                  </FancyCard>

                  <FancyCard color={a.isCorrect ? 'green' : 'red'} className='flex items-center p-5 justify-between aspect-square'>
                    {a.isCorrect ? <Check /> : <X />}
                  </FancyCard>
                </div>
              )
            })
          )
        }
      </div>
    </StepDisplay>
  )
}

export default QuestionAnswers