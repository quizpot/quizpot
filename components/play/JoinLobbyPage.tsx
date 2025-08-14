"use client"
import React, { useEffect } from 'react'
import { useToast } from '../ui/Toaster'
import { useWebSocket } from '../providers/WebSocketProvider'
import NumberInput from '../ui/NumberInput'
import Button from '../ui/Button'
import { usePlayerLobbyState } from '../providers/PlayerLobbyStateProvider'

const JoinLobbyPage = ({ queryCode, name }: { queryCode?: number, name?: string }) => {
  const addToast = useToast()
  const [code, setCode] = React.useState<number>(0)
  const { sendEvent, onEvent, isConnected } = useWebSocket()
  const setPlayerLobbyState = usePlayerLobbyState().setPlayerLobbyState

  useEffect(() => {
    if (!isConnected) return

    if (queryCode) {
      setCode(queryCode)
      sendEvent('lobbyJoin', { code, name })
    }
    
    const unsubscribeJoinLobby = onEvent('lobbyJoined', (ctx) => {
      setPlayerLobbyState(ctx.lobby)
    })

    const unsubscribeLobbyJoinError = onEvent('lobbyJoinError', (ctx) => {
      addToast({ message: ctx.error, type: 'error' })
    })

    return () => {
      unsubscribeJoinLobby()
      unsubscribeLobbyJoinError()
    }
  }, [isConnected, onEvent, addToast, setPlayerLobbyState, sendEvent, queryCode, code, name])

  if (!isConnected) {
    return <></>
  }

  const onClick = async () => {
    if (!code) return

    addToast({ message: 'Joining lobby...', type: 'info' })

    sendEvent('lobbyJoin', { code, name })
  }

  return (
    <section className='flex flex-col gap-4 items-center justify-center h-screen w-full p-4'>
      <h1 className='text-2xl font-semibold'>Join a Lobby</h1>
      <div className='max-w-md'>
        <NumberInput onChange={(e) => {
          const value = e.target.value
          if (value === '') {
            setCode(0)
          } else {
            setCode(parseInt(e.target.value))
          }
        }} value={ code } />
      </div>
      <Button onClick={ onClick } variant='green' >
        Join
      </Button>
    </section>
  )
}

export default JoinLobbyPage