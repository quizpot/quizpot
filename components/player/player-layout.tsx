import React from 'react'
import MessagePage from '../ui/message-page'
import { usePlayerLobbyState } from '../providers/player-ls-provider'
import { getBackgroundStyles } from '@/lib/client/background-styles'
import FancyCard from '../ui/fancy-card'
import StepIcon from '../ui/step-icon'

const PlayerStatusLayout = ({ children }: { children: React.ReactNode }) => {
  const { playerLobbyState } = usePlayerLobbyState()
  
  if (!playerLobbyState) {
    return <MessagePage message='Waiting for player lobby state...' />
  }

  return (
    <main
      className='h-dvh w-full flex flex-col gap-2 select-none'
      style={ getBackgroundStyles(playerLobbyState.quizInfo.theme) }
    >
      <div className='w-full h-full overflow-y-hidden'>
        { children }
      </div>
      <div className='flex gap-4 px-4 pb-4 justify-between'>
        <div className='flex gap-2'>
          <FancyCard className='font-semibold'>
            { playerLobbyState.me.name }
          </FancyCard>
          <FancyCard className='font-semibold'>
            { playerLobbyState.me.score }
          </FancyCard>
        </div>
        {
          playerLobbyState.status !== 'waiting' && (
            <div className='flex gap-2'>
              {
                playerLobbyState.currentStep && (
                  <FancyCard size='sm' className='flex items-center justify-center'>
                    <StepIcon step={ playerLobbyState.currentStep } />
                  </FancyCard>
                )
              }
              <FancyCard>
                { playerLobbyState.stepNumber } of { playerLobbyState.quizInfo.stepCount }
              </FancyCard>
            </div>
          )
        }
      </div>
    </main>
  )
}

export default PlayerStatusLayout