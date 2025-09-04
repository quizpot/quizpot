import React from 'react'
import { HostLobbyState } from '../../providers/HostLobbyStateProvider'
import NextQuestionButton from '../ui/NextQuestionButton'

const ScoreboardPage = ({ hostLobbyState }: { hostLobbyState: HostLobbyState }) => {
  const backgroundIsImage = hostLobbyState.theme.background.includes('base64')

  return (
    <section 
      className='flex flex-col gap-4 justify-between h-screen w-full'
      style={
        backgroundIsImage ? { 
          backgroundImage: `url(${hostLobbyState.theme.background})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        } : { 
          backgroundColor: hostLobbyState.theme.background
        }
      }
    >
      <div className='absolute top-4 right-4'>
        <NextQuestionButton />
      </div>
      <h1 className='text-center text-4xl font-semibold bg-white text-black p-4 mx-auto'>Scoreboard</h1>
      <div className='flex flex-col gap-4'>
        {
          hostLobbyState.players.map((player, index) => (
            <div key={index} className='flex justify-between items-center p-4 bg-white rounded-lg text-4xl'>
              <h1>{ player.name }</h1>
              <span>{ player.score }</span>
            </div>
          ))
        }
      </div>
      <div></div>
    </section>
  )

  return (
    <section className='flex flex-col gap-4 items-center justify-center h-screen w-full p-4'>
      {
        hostLobbyState.players.map((player, index) => (
          <p key={index}>{ player.name }: { player.score }</p>
        ))
      }
    </section>
  )
}

export default ScoreboardPage