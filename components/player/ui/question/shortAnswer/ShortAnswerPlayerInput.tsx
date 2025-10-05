"use client"
import { usePlayerLobbyState } from '@/components/providers/PlayerLobbyStateProvider'
import { useWebSocket } from '@/components/providers/WebSocketProvider'
import Button from '@/components/ui/Button'
import TextInput from '@/components/ui/TextInput'
import React from 'react'

const ShortAnswerPlayerInput = () => {
  const [answer, setAnswer] = React.useState("")
  const { sendEvent } = useWebSocket()
  const { setPlayerLobbyState } = usePlayerLobbyState()

  const onSubmit = () => {
    sendEvent('submitAnswer', { 
      answer: { 
        answerType: 'shortAnswer', 
        answer
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
    <>
      <TextInput onChange={ e => setAnswer(e.target.value) } value={ answer } className='w-full text-center' />
      <Button onClick={ onSubmit } variant='green' className='w-full text-center'>
        Submit
      </Button>
    </>
  )
}

export default ShortAnswerPlayerInput