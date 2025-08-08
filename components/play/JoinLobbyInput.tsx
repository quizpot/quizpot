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
  const setLobby = useLobbyState().setLobbyState

  useEffect(() => {
    if (!isConnected) return
    
    const unsubscribeJoinLobby = onEvent('lobbyJoined', (ctx) => {
      setLobby(ctx.lobby)
      addToast({ message: 'Lobby joined with code: ' + ctx.lobby.code, type: 'success' })
    })

    const unsubscribeLobbyJoinError = onEvent('lobbyJoinError', (ctx) => {
      addToast({ message: 'Failed to join lobby with code: ' + code, type: 'error' })
      console.log(ctx.error)
    })

    // Cleanup function to remove handlers on unmount
    return () => {
      unsubscribeJoinLobby()
      unsubscribeLobbyJoinError()
    }
  }, [isConnected, onEvent, addToast, setLobby, code])

  if (!isConnected) {
    return <p>Connecting to server...</p>
  }

  const handleJoin = async () => {
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
      <button onClick={ handleJoin }>
        Join
      </button>
    </>
  )
}

export default JoinLobbyInput