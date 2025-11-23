"use client"
import React, { useEffect } from 'react'
import TextInput from '../../ui/TextInput'
import { useToast } from '../../ui/toaster'
import { useWebSocket } from '../../providers/WebSocketProvider'
import { usePlayerLobbyState } from '../../providers/PlayerLobbyStateProvider'
import { redirect } from 'next/navigation'
import { useTranslations } from 'next-intl'
import FancyButton from '@/components/ui/fancy-button'

const SetNamePage = ({ queryCode }: { queryCode: number }) => {
  const t = useTranslations('PlayPage')
  const toast = useToast() 
  const [name, setName] = React.useState<string>('')
  const [wantsName, setWantsName] = React.useState(false)
  const { sendEvent, onEvent, isConnected } = useWebSocket()
  const setPlayerLobbyState = usePlayerLobbyState().setPlayerLobbyState

  useEffect(() => {
    if (!isConnected) return
    
    const unsubscribeJoinLobby = onEvent('lobbyJoined', (ctx) => {
      localStorage.setItem('playerId', ctx.lobby.player.id)
      setPlayerLobbyState(ctx.lobby)
    })

    const playerId = localStorage.getItem('playerId')

    if (typeof playerId === 'string') {
      sendEvent('joinLobbyWithId', { code: queryCode, id: playerId })
    } else {
      sendEvent('joinLobby', { code: queryCode })
    }

    const unsubscribeLobbyJoinError = onEvent('lobbyJoinError', (ctx) => {
      if (ctx.message.includes('not found')) redirect('/play')

      if (ctx.message.includes('not in the lobby')) {
        sendEvent('joinLobby', { code: queryCode })
        return
      }

      if (ctx.message.includes('Name not provided')) {
        setWantsName(true)
        return
      }

      localStorage.removeItem('playerId')
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

  if (!wantsName) return <></>

  return (
    <section className='flex flex-col gap-4 items-center justify-center h-screen w-full p-4'>
      <h1 className='text-2xl font-semibold'>{ t('setName') }</h1>
      <div className='max-w-md'>
        <TextInput onChange={(e) => {
          const value = e.target.value
          setName(value)
        }} value={ name } />
      </div>
      <FancyButton onClick={ onClick } color='green' >
        { t('continue') }
      </FancyButton>
    </section>
  )
}

export default SetNamePage