import React from 'react'
import { HostLobbyState } from '../../providers/HostLobbyStateProvider'
import NextQuestionButton from '../ui/NextQuestionButton'
import { getBackgroundStyles } from '@/lib/client/BackgroundStyles'
import Button from '@/components/ui/ButtonOld'
import Card from '@/components/ui/Card'

const ScoreboardPage = ({ hostLobbyState }: { hostLobbyState: HostLobbyState }) => {
  return (
    <section 
      className='flex flex-col gap-4 justify-between h-screen w-full'
      style={ getBackgroundStyles(hostLobbyState.theme.background) }
    >
      <div className='flex gap-4 w-full p-4'>
        <Button variant='gray' className='text-center text-4xl font-semibold w-full py-4 px-4'>
          Scoreboard
        </Button>
        <NextQuestionButton className='h-full flex items-center font-semibold justify-center px-4 text-2xl' />
      </div>
      <div className='flex flex-col gap-4 p-4 h-full justify-center'>
        {
          hostLobbyState.players.map((player, index) => {
            if (index > 4) return <></>
            return (
              <Card key={index} className='flex justify-between items-center p-4 bg-white rounded-lg text-4xl'>
                <h1>{ player.name }</h1>
                <span>{ player.score }</span>
              </Card>
            )
          })
        }
      </div>
    </section>
  )
}

export default ScoreboardPage