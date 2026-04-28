import { PlayerLobbyState } from '@quizpot/quizcore'
import QuestionAnswers from '../ui/question/QuestionAnswers'
import { getBackgroundStyles } from '@/lib/client/background-styles'

const AnswerPage = ({ playerLobbyState }: { playerLobbyState: PlayerLobbyState }) => {
  if (!playerLobbyState.currentQuestion) return null
  
  return (
    <section 
      className='max-h-screen h-screen w-full'
      style={ getBackgroundStyles(playerLobbyState.quizInfo.theme) }
    >
      <QuestionAnswers question={ playerLobbyState.currentQuestion } />
    </section>
  )
}

export default AnswerPage