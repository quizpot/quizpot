import { usePlayerLobbyState } from '@/components/providers/PlayerLobbyStateProvider'
import { useWebSocket } from '@/components/providers/WebSocketProvider'
import FancyButton from '@/components/ui/fancy-button'
import { Color } from '@/lib/Colors'
import { Choice } from '@/lib/QuizFile'
import React from 'react'

const MultipleChoicePlayerAnswerButton = ({ choice, index, color }: { choice: Omit<Choice, 'correct'>, index: number, color: Color }) => {
  const { setPlayerLobbyState } = usePlayerLobbyState()
  const { sendEvent } = useWebSocket()

  const sendAnswer = () => {
    sendEvent('submitAnswer', { 
      answer: { 
        answerType: 'multipleChoice', 
        choiceIndex: index
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
      <div className='flex justify-between items-center w-full h-full p-8 text-2xl lg:text-4xl'>
        { choice.text }
      </div>
    </FancyButton>
  )
}

export default MultipleChoicePlayerAnswerButton