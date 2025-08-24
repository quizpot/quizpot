import React from 'react'
import { PlayerLobbyState } from '../providers/PlayerLobbyStateProvider'
import Button from '../ui/Button'
import { useWebSocket } from '../providers/WebSocketProvider'

const AnswerPage = ({ playerLobbyState }: { playerLobbyState: PlayerLobbyState }) => {
  const { sendEvent } = useWebSocket()

  return (
    <section className='flex flex-col gap-4 items-center justify-center h-screen w-full p-4'>
      <h1 className='text-2xl font-semibold'>Answer Page</h1>
      {
        playerLobbyState.currentQuestion.questionType === 'multipleChoice' && (
          <>
            {
              playerLobbyState.currentQuestion.choices.map((choice, index) => (
                <Button key={ index } onClick={ 
                  () => { 
                    sendEvent('submitAnswer', { 
                      answer: { choiceIndex: index } 
                    }) 
                  } 
                } variant='yellow'>
                  { choice.text }
                </Button>
              ))
            }
          </>
        )
      }
    </section>
  )
}

export default AnswerPage