import { useWebSocket } from '@/components/providers/ws-provider'
import FancyButton from '@/components/ui/fancy-button'

const NextQuestionButton = ({ className }: { className?: string }) => {
  const { sendEvent } = useWebSocket()
  
  return (
    <FancyButton color='green' className={ className } onClick={() => {
      sendEvent('NEXT_STEP')
    }}>
      Next
    </FancyButton>
  )
}

export default NextQuestionButton