import { useWebSocket } from '@/components/providers/WebSocketProvider'
import Button from '@/components/ui/ButtonOld'
import React from 'react'

const NextQuestionButton = ({ className }: { className?: string }) => {
  const { sendEvent } = useWebSocket()
  
  return (
    <Button variant='green' className={ className } onClick={() => {
      sendEvent('nextQuestion', {})
    }}>
      Next
    </Button>
  )
}

export default NextQuestionButton