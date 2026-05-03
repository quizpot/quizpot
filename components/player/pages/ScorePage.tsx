import { getBackgroundStyles } from '@/lib/client/background-styles'
import FancyCard from '@/components/ui/fancy-card'
import { PlayerLobbyState } from '@quizpot/quizcore'

const ScorePage = ({ playerLobbyState }: { playerLobbyState: PlayerLobbyState }) => {
  return (
    <section 
      className='flex gap-4 p-4 items-center justify-center h-screen w-full'
      style={ getBackgroundStyles(playerLobbyState.quizInfo.theme) }
    >
      <FancyCard className='text-center text-2xl lg:text-4xl font-semibold py-4 px-4'>
        { playerLobbyState.me.name }
      </FancyCard>
      <FancyCard className='text-center text-2xl lg:text-4xl font-semibold py-4 px-4'>
        { playerLobbyState.me.score }
      </FancyCard>
    </section>
  )
}

export default ScorePage