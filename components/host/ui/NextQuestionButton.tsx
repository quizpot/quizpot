import { useWebSocket } from '@/components/providers/WebSocketProvider'
import Button from '@/components/ui/Button'
import React from 'react'

const NextQuestionButton = () => {
  const { sendEvent } = useWebSocket()
  return (
    <Button variant='gray' onClick={() => {
      sendEvent('nextQuestion', {})
    }}>
      Next
    </Button>
  )
}

export default NextQuestionButton