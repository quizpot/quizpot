import { usePlayerLobbyState } from '@/components/providers/player-ls-provider'
import { useWebSocket } from '@/components/providers/ws-provider'
import FancyButton from '@/components/ui/fancy-button'
import { Color } from '@/lib/colors'

const TrueFalsePlayerAnswerButton = ({ value, color }: { value: boolean, color: Color }) => {
  const { setPlayerLobbyState } = usePlayerLobbyState()
  const sendEvent = useWebSocket().sendEvent

  const sendAnswer = () => {
    sendEvent('SUBMIT_ANSWER', { 
      submission: {
        type: 'trueFalse',
        answer: value
      }
    })

    setPlayerLobbyState(prev => {
      if (!prev) return null
      return {
        ...prev,
        hasAnswered: true,
      }
    })
  }

  return (
    <FancyButton color={ color } onClick={ sendAnswer } className='w-full h-full'>
      {/* <div className='flex justify-between items-center w-full h-full p-8 text-4xl'>
        { value ? 'True' : 'False' }
      </div> */}
    </FancyButton>
  )
}

export default TrueFalsePlayerAnswerButton