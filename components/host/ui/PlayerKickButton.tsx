"use client"
import React from 'react'
import { useWebSocket } from '../../providers/WebSocketProvider'
import { PlayerState } from '@/lib/misc/PlayerState'
import FancyButton from '@/components/ui/fancy-button'
import { Color } from '@/lib/Colors'

const PlayerKickButton = ({ player, color }: { player: PlayerState, color: Color }) => {
  const { sendEvent } = useWebSocket()

  if (!player.id) {
    console.warn("[PlayerKickButton] Player ID is missing, cannot kick player.")
    return <></>
  }

  const onClick = () => {
    sendEvent('playerKick', { playerId: player.id })
  }

  return (
    <FancyButton color={ color } onClick={ onClick }>
      { player.name }
    </FancyButton>
  )
}

export default PlayerKickButton