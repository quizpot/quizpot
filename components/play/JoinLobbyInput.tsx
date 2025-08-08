"use client"
import React, { useEffect } from 'react'
import { useToast } from '../ui/Toaster'
import { useWebSocket } from '../ws/WebSocket'
import NumberInput from '../ui/NumberInput'
import { useLobbyState } from '../providers/LobbyStateProvider'

const JoinLobbyInput = () => {
  const addToast = useToast()
  const [code, setCode] = React.useState<number>(0)
  const { sendEvent, onEvent, isConnected } = useWebSocket()
  const setLobbyState = useLobbyState().setLobbyState

  useEffect(() => {
    if (!isConnected) return
    console.log('hooking join logic')
    
    const unsubscribeJoinLobby = onEvent('lobbyJoined', (ctx) => {
      console.log('joined lobby')
      setLobbyState(ctx.lobby)
      addToast({ message: 'Lobby joined with code: ' + ctx.lobby.code, type: 'success' })
    })

    const unsubscribeLobbyJoinError = onEvent('lobbyJoinError', (ctx) => {
      addToast({ message: 'Failed to join lobby!', type: 'error' })
      console.log(ctx.error)
    })

    // Cleanup function to remove handlers on unmount
    return () => {
      unsubscribeJoinLobby()
      unsubscribeLobbyJoinError()
    }
  }, [isConnected, onEvent, addToast, setLobbyState])

  if (!isConnected) {
    return <p>Connecting to server...</p>
  }

  const onClick = async () => {
    if (!code) return

    addToast({ message: 'Joining lobby...', type: 'info' })

    // Use the new sendEvent helper
    sendEvent('lobbyJoin', {
      code,
    })
  }

  return (
    <>
      <NumberInput onChange={(e) => {
        setCode(parseInt(e.target.value))
      }} value={ code } />
      <button onClick={ onClick }>
        Join
      </button>
    </>
  )
}

export default JoinLobbyInput