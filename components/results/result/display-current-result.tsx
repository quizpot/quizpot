"use client"

import { useResultCurrentStep } from "../providers/result-current-step-provider"
import { useResult } from "../providers/result-provider"
import StepDisplay from "./step-display"
import QuestionAnswers from "../question-answers"
import FancyCard from "@/components/ui/fancy-card"

const DisplayCurrentResult = () => {
  const { result } = useResult()
  const { currentStep } = useResultCurrentStep()

  if (currentStep === null) {
    return (
      <StepDisplay className='flex flex-col gap-4 h-full w-full p-4'>
        <FancyCard className='text-center text-4xl font-semibold w-full py-4 px-4'>
          Leaderboard
        </FancyCard>
        <div className="overflow-y-auto pb-4 flex flex-col gap-4">
          {
            result.players.map((p, i) => {
              return (
                <div key={i} className='flex gap-4 w-full'>
                  <FancyCard color={i % 2 ? 'background' : 'foreground'} className='text-2xl font-semibold w-full py-4 px-4'>
                    {p?.name ?? "Unknown Player"}
                  </FancyCard>
                  <FancyCard color={i % 2 ? 'background' : 'foreground'} className='text-2xl font-semibold py-4 px-4'>
                    {p.score}
                  </FancyCard>
                </div>
              )
            })
          }
        </div>
      </StepDisplay>
    )
  }

  const step = result.quiz.steps[currentStep]

  const renderEditor = () => {
    if (step.type === 'question') {
      return (
        <QuestionAnswers />
      )
    } else if (step.type === 'slide') {
      return (
        <StepDisplay className="flex items-center justify-center text-2xl p-4">
          Select a question ...
        </StepDisplay>
      )
    }

    return (
      <StepDisplay className="flex items-center justify-center text-2xl p-4">
        Select a step ...
      </StepDisplay>
    )
  }

  return (
    <>
      { renderEditor() }
    </>
  )
}

export default DisplayCurrentResult