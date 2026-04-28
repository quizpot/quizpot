import { getBackgroundStyles } from '@/lib/client/background-styles'
import FancyCard from '@/components/ui/fancy-card'
import { PlayerLobbyState } from '@quizpot/quizcore'
import { FileQuestionMark } from 'lucide-react'

const AnswersPage = ({ playerLobbyState }: { playerLobbyState: PlayerLobbyState }) => {
  return (
    <section 
      className='flex flex-col gap-4 items-center justify-center h-screen w-full'
      style={ getBackgroundStyles(playerLobbyState.quizInfo.theme) }
    >
      <FancyCard color='white' className='text-center text-4xl font-semibold py-4 px-4 mx-auto'>
        {/* TODO: Fix { playerLobbyState.correctAnswer ? t('correct') : t('incorrect') } */}
        <FileQuestionMark />
      </FancyCard>
    </section>
  )
}

export default AnswersPage