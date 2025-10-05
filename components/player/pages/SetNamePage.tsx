"use client"
import React, { useEffect } from 'react'
import TextInput from '../../ui/TextInput'
import Button from '../../ui/Button'
import { useToast } from '../../ui/Toaster'
import { useWebSocket } from '../../providers/WebSocketProvider'
import { usePlayerLobbyState } from '../../providers/PlayerLobbyStateProvider'

const SetNamePage = ({ queryCode }: { queryCode: number }) => {
  const toast = useToast() 
  const [name, setName] = React.useState<string>('')
  const { sendEvent, onEvent, isConnected } = useWebSocket()
  const setPlayerLobbyState = usePlayerLobbyState().setPlayerLobbyState

  useEffect(() => {
    if (!isConnected) return
    
    const unsubscribeJoinLobby = onEvent('lobbyJoined', (ctx) => {
      setPlayerLobbyState(ctx.lobby)
    })

    sendEvent('joinLobby', { code: queryCode })

    const unsubscribeLobbyJoinError = onEvent('lobbyJoinError', (ctx) => {
      toast(ctx.message, { variant: 'error' })
    })

    return () => {
      unsubscribeJoinLobby()
      unsubscribeLobbyJoinError()
    }
  }, [isConnected, onEvent, toast, setPlayerLobbyState, sendEvent, queryCode])

  const onClick = async () => {
    toast('Joining lobby...', { variant: 'info' })

    sendEvent('joinLobby', { code: queryCode, name })
  }

  return (
    <section className='flex flex-col gap-4 items-center justify-center h-screen w-full p-4'>
      <h1 className='text-2xl font-semibold'>Set Your Name</h1>
      <div className='max-w-md'>
        <TextInput onChange={(e) => {
          const value = e.target.value
          setName(value)
        }} value={ name } />
      </div>
      <Button onClick={ onClick } variant='green' >
        Continue
      </Button>
    </section>
  )
}

export default SetNamePage