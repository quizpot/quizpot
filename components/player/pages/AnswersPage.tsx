import { getBackgroundStyles } from '@/lib/client/background-styles'
import FancyCard from '@/components/ui/fancy-card'
import { PlayerLobbyState } from '@quizpot/quizcore'
import { Check, X } from 'lucide-react'

const AnswersPage = ({ playerLobbyState }: { playerLobbyState: PlayerLobbyState }) => {
  return (
    <section 
      className='flex flex-col gap-4 items-center justify-center h-screen w-full'
      style={ getBackgroundStyles(playerLobbyState.quizInfo.theme) }
    >
      <FancyCard color={ playerLobbyState.wasCorrect ? "green" : "red" } className='text-center text-4xl font-semibold py-4 px-4 mx-auto'>
        { playerLobbyState.wasCorrect ? <Check /> : <X /> }
      </FancyCard>
    </section>
  )
}

export default AnswersPage