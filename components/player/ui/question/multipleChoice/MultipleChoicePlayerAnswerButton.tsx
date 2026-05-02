import { usePlayerLobbyState } from '@/components/providers/player-ls-provider'
import { useWebSocket } from '@/components/providers/ws-provider'
import FancyButton from '@/components/ui/fancy-button'
import { Color, colorIcons } from '@/lib/colors'
import { Choice } from '@quizpot/quizcore'
import { Icon } from 'lucide-react'

// TODO: Show answer on device?
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const MultipleChoicePlayerAnswerButton = ({ choice, index, color }: { choice: Omit<Choice, 'correct'>, index: number, color: Color }) => {
  const { setPlayerLobbyState } = usePlayerLobbyState()
  const { sendEvent } = useWebSocket()

  const sendAnswer = () => {
    sendEvent('SUBMIT_ANSWER', {
      submission: {
        type: 'multipleChoice',
        choices: [ index ]
      },
    })

    setPlayerLobbyState(prevPlayerLobbyState => {
      if (!prevPlayerLobbyState) return null

      return {
        ...prevPlayerLobbyState,
        hasAnswered: true,
      }
    })
  }

  const Icon = colorIcons[color as keyof typeof colorIcons]

  return (
    <FancyButton color={ color } onClick={ sendAnswer } className='w-full h-full flex items-center gap-4 text-2xl'>
      <Icon size={ 32 } />
      { choice.text }
    </FancyButton>
  )
}

export default MultipleChoicePlayerAnswerButton