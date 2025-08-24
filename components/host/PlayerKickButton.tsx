"use client"
import React from 'react'
import ActionButton, { ActionButtonVariant } from '../ui/ActionButton'
import { useWebSocket } from '../providers/WebSocketProvider'
import { PlayerState } from '@/lib/misc/PlayerState'

const PlayerKickButton = ({ player, variant }: { player: PlayerState, variant: ActionButtonVariant }) => {
  const { sendEvent } = useWebSocket()

  if (!player.id) {
    console.warn("[PlayerKickButton] Player ID is missing, cannot kick player.")
    return <></>
  }

  const onClick = () => {
    sendEvent('playerKick', { playerId: player.id })
  }

  return (
    <ActionButton actionName='Kick' onClick={ onClick } variant={ variant }>
      { player.name }
    </ActionButton>
  )
}

export default PlayerKickButton