"use client"
import React from 'react'
import ActionButton, { actionButtonVariants } from '../ui/ActionButton'
import { useWebSocket } from '../ws/WebSocket'

const PlayerKickButton = ({ player }: { player: { id?: string, name: string, score: number } }) => {
  const { sendEvent } = useWebSocket()

  if (!player.id) {
    console.warn("[PlayerKickButton] Player ID is missing, cannot kick player.")
    return <></>
  }

  const onClick = () => {
    sendEvent('playerKick', { playerId: player.id })
  }

  return (
    <ActionButton actionName='Kick' onClick={ onClick } variant={ actionButtonVariants[Math.floor(Math.random() * actionButtonVariants.length)] }>
      { player.name }
    </ActionButton>
  )
}

export default PlayerKickButton