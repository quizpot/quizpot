import { usePlayerLobbyState } from '@/components/providers/PlayerLobbyStateProvider'
import { useWebSocket } from '@/components/providers/WebSocketProvider'
import Button from '@/components/ui/Button'
import { ColorVariants } from '@/lib/misc/colorVariants/ColorVariants'
import React from 'react'

const TrueFalsePlayerAnswerButton = ({ value, variant }: { value: boolean, variant: ColorVariants }) => {
  const { setPlayerLobbyState } = usePlayerLobbyState()
  const sendEvent = useWebSocket().sendEvent

  const sendAnswer = () => {
    sendEvent('submitAnswer', { 
      answer: { 
        answerType: 'trueFalse',
        answer: value,
      } 
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
    <Button variant={ variant } onClick={ sendAnswer } className='w-full h-full'>
      <div className='flex justify-between items-center w-full h-full p-8 text-4xl'>
        { value ? 'True' : 'False' }
      </div>
    </Button>
  )
}

export default TrueFalsePlayerAnswerButton