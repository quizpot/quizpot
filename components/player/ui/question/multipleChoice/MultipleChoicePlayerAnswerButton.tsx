import { usePlayerLobbyState } from '@/components/providers/PlayerLobbyStateProvider'
import { useWebSocket } from '@/components/providers/WebSocketProvider'
import Button from '@/components/ui/Button'
import { ColorVariants } from '@/lib/client/colorVariants/ColorVariants'
import { Choice } from '@/lib/misc/QuizFile'
import React from 'react'

const MultipleChoicePlayerAnswerButton = ({ choice, index, variant }: { choice: Omit<Choice, 'correct'>, index: number, variant: ColorVariants }) => {
  const { setPlayerLobbyState } = usePlayerLobbyState()
  const sendEvent = useWebSocket().sendEvent

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
    <Button variant={ variant } onClick={ sendAnswer } className='w-full h-full'>
      <div className='flex justify-between items-center w-full h-full p-8 text-2xl lg:text-4xl'>
        { choice.text }
      </div>
    </Button>
  )
}

export default MultipleChoicePlayerAnswerButton