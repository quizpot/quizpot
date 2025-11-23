import { usePlayerLobbyState } from '@/components/providers/PlayerLobbyStateProvider'
import { useWebSocket } from '@/components/providers/WebSocketProvider'
import FancyButton from '@/components/ui/fancy-button'
import { Color } from '@/lib/Colors'
import React from 'react'

const TrueFalsePlayerAnswerButton = ({ value, color }: { value: boolean, color: Color }) => {
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
    <FancyButton color={ color } onClick={ sendAnswer } className='w-full h-full'>
      {/* <div className='flex justify-between items-center w-full h-full p-8 text-4xl'>
        { value ? 'True' : 'False' }
      </div> */}
    </FancyButton>
  )
}

export default TrueFalsePlayerAnswerButton