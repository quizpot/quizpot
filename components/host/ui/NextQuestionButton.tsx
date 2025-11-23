import { useWebSocket } from '@/components/providers/WebSocketProvider'
import FancyButton from '@/components/ui/fancy-button'
import React from 'react'

const NextQuestionButton = ({ className }: { className?: string }) => {
  const { sendEvent } = useWebSocket()
  
  return (
    <FancyButton color='green' className={ className } onClick={() => {
      sendEvent('nextQuestion', {})
    }}>
      Next
    </FancyButton>
  )
}

export default NextQuestionButton