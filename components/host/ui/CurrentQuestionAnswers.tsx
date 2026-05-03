import MultipleChoiceAnswerButton from './answerButtons/MultipleChoiceAnswerButton'
import MultipleChoiceAnswerButtonWithAnswer from './answerButtons/MultipleChoiceAnswerButtonWithAnswer'
import { colorKeys } from '@/lib/colors'
import FancyCard from '@/components/ui/fancy-card'
import AnswerCard from './answerDisplay/AnswerCard'
import { useHostLobbyState } from '@/components/providers/host-ls-provder'
import { Question } from '@quizpot/quizcore'

const CurrentQuestionAnswers = ({ currentQuestion, showAnswers }: { currentQuestion: Question, showAnswers?: boolean }) => {
  const { hostLobbyState } = useHostLobbyState()

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
                label={ currentQuestion.labels[0] }
                color='red'
                isCorrect={ currentQuestion.answer } 
              />
              <MultipleChoiceAnswerButtonWithAnswer 
                label={ currentQuestion.labels[1] }
                color='blue'
                isCorrect={ !currentQuestion.answer } 
              />
            </>
            :
            <>
              <MultipleChoiceAnswerButton label={ currentQuestion.labels[0] } color='red' />
              <MultipleChoiceAnswerButton label={ currentQuestion.labels[1] } color='blue' />
            </>
        }
      </section>
    )
  }

  if (currentQuestion.questionType === 'shortAnswer') {
    if (showAnswers) {
      const answerCounter: number[] = []

      hostLobbyState?.answers.filter((a) => a.isCorrect).map((answer, index) => {
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
        <FancyCard className='flex items-center justify-center p-8 mx-auto text-2xl'>
          Send your answer!
        </FancyCard>
      </div>
    )
  }

  return (
    <>a</>
  )
}

export default CurrentQuestionAnswers