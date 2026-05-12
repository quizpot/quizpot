import { PlayerLobbyState, SafeQuestion } from '@quizpot/quizcore'
import QuestionAnswers from '../ui/question/QuestionAnswers'
import { getBackgroundStyles } from '@/lib/client/background-styles'
import FancyCard from '@/components/ui/fancy-card'
import QuestionImage from '@/components/host/ui/QuestionImage'
import LoadingPage from '@/components/ui/loading-page'

const AnswerPage = ({ playerLobbyState }: { playerLobbyState: PlayerLobbyState }) => {
  if (!playerLobbyState.currentStep) return null

  if (playerLobbyState.hasAnswered) return (
    <LoadingPage message='Answered ...' />
  )

  const question = playerLobbyState.currentStep.data as SafeQuestion

  if (playerLobbyState.lobbySettings.displayOnDevice) {
    return (
      <section className='flex flex-col gap-4 items-center justify-between h-full w-full p-4'>
        <div className='flex gap-4 w-full'>
          <FancyCard className='text-center text-4xl font-semibold w-full py-4 px-4'>
            {question.question}
          </FancyCard>
        </div>
        <div className='flex items-center justify-between gap-4 w-full h-full'>
          <QuestionImage src={question.imageHash} />
        </div>
        <div className='w-full'>
          <QuestionAnswers question={ playerLobbyState.currentStep.data as SafeQuestion } />
        </div>
      </section>
    )
  }
  
  return (
    <section 
      className='flex h-full w-full flex-col'
      style={ getBackgroundStyles(playerLobbyState.quizInfo.theme) }
    >
      <QuestionAnswers question={ question } />
    </section>
  )
}

export default AnswerPage