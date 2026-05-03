import { usePlayerLobbyState } from '@/components/providers/player-ls-provider'
import { useWebSocket } from '@/components/providers/ws-provider'
import FancyButton from '@/components/ui/fancy-button'
import { Color, colorIcons } from '@/lib/colors'

const TrueFalsePlayerAnswerButton = ({ index, value, color }: { index: number, value: boolean, color: Color }) => {
  const { setPlayerLobbyState, playerLobbyState } = usePlayerLobbyState()
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

  const step = playerLobbyState?.currentStep

  if (step?.type !== 'question' || step?.data.questionType !== 'trueFalse') return null

  const Icon = colorIcons[color as keyof typeof colorIcons]

  return (
    <FancyButton color={ color } onClick={ sendAnswer } className='w-full h-full flex items-center gap-4 text-2xl'>
      {
        playerLobbyState?.lobbySettings.displayOnDevice && (
          <>
            <Icon size={ 32 } />
            { step.data.labels[index] }
          </>
        )
      }
    </FancyButton>
  )
}

export default TrueFalsePlayerAnswerButton