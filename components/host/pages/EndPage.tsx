import React from 'react'
import { HostLobbyState } from '../../providers/HostLobbyStateProvider'
import { getBackgroundStyles } from '@/lib/client/BackgroundStyles'
import FancyCard from '@/components/ui/fancy-card'
import FancyButton from '@/components/ui/fancy-button'
import { Color } from '@/lib/Colors'

const EndPage = ({ hostLobbyState }: { hostLobbyState: HostLobbyState }) => {
  const onExitFullscreen = () => {
    document.exitFullscreen()
    window.location.href = '/' 
  }

  return (
    <section 
      className='flex flex-col gap-4 justify-between h-screen w-full p-4'
      style={ getBackgroundStyles(hostLobbyState.theme.background) }
    >
      <div className='flex gap-4 w-full p-4'>
        <FancyCard color='white' className='text-center text-4xl font-semibold w-full py-4 px-4'>
          Results
        </FancyCard>
        <FancyButton color='green' onClick={ onExitFullscreen } className='h-full flex items-center font-semibold justify-center px-4 text-2xl'>
          Exit
        </FancyButton>
      </div>
      <div className='flex flex-col gap-4 p-4'>
        {
          hostLobbyState.players.map((player, index) => {
            let color: Color = 'white'
            
            if (index === 0) color = 'yellow'

            return (
              <FancyCard key={ index } color={ color } className='flex justify-between items-center p-6 rounded-lg text-4xl'>
                <h1>{ player.name }</h1>
                <span>{ player.score }</span>
              </FancyCard>
            )
          })
        }
      </div>
      <div></div>
    </section>
  )
}

export default EndPage