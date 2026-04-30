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
      className='h-dvh w-full flex flex-col gap-2'
      style={ getBackgroundStyles(playerLobbyState.quizInfo.theme) }
    >
      {
        playerLobbyState.currentStep && (
          <div className='flex gap-2 items-center justify-center p-2'>
            <FancyCard>
              { playerLobbyState.stepNumber }
            </FancyCard>
            <FancyCard>
              <StepIcon step={ playerLobbyState.currentStep } />
            </FancyCard>
          </div>
        )
      }
      <div className='w-full h-full overflow-y-hidden'>
        { children }
      </div>
      <div className='flex gap-2 p-4'>
        <FancyCard>
          { playerLobbyState.me.name }
        </FancyCard>
        <FancyCard>
          { playerLobbyState.me.score }
        </FancyCard>
      </div>
    </main>
  )
}

export default PlayerStatusLayout