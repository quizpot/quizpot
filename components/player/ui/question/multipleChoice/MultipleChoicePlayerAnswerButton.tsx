import { usePlayerLobbyState } from '@/components/providers/player-ls-provider'
import { useWebSocket } from '@/components/providers/ws-provider'
import FancyButton from '@/components/ui/fancy-button'
import { Color } from '@/lib/colors'
import { Choice } from '@quizpot/quizcore'

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

  return (
    <FancyButton color={ color } onClick={ sendAnswer } className='w-full h-full'>
      {/* <div className='flex justify-between items-center w-full h-full p-8 text-2xl lg:text-4xl'>
        { choice.text }
      </div> */}
    </FancyButton>
  )
}

export default MultipleChoicePlayerAnswerButton