import { getBackgroundStyles } from '@/lib/client/background-styles'
import FancyCard from '@/components/ui/fancy-card'
import { PlayerLobbyState } from '@quizpot/quizcore'

const QuestionPage = ({ playerLobbyState }: { playerLobbyState: PlayerLobbyState }) => {
  const question = playerLobbyState.currentStep

  if (!question || question.type !== 'question') return <></>

  return (
    <section 
      className='flex flex-col gap-4 items-center justify-center h-screen w-full'
      style={ getBackgroundStyles(playerLobbyState.quizInfo.theme) }
    >
      <FancyCard className='text-center text-4xl font-semibold py-4 w-full px-4 mx-auto'>
        { question.data.question }
      </FancyCard>
    </section>
  )
}

export default QuestionPage