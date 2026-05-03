"use client"
import FancyButton from '@/components/ui/fancy-button'
import { Color } from '@/lib/colors'
import { useWebSocket } from '@/components/providers/ws-provider'
import { Player } from '@quizpot/quizcore'

const PlayerKickButton = ({ player, color }: { player: Player, color?: Color }) => {
  const { sendEvent } = useWebSocket()

  if (!player.id) {
    console.warn("[PlayerKickButton] Player ID is missing, cannot kick player.")
    return <></>
  }

  const onClick = () => {
    sendEvent('KICK_PLAYER', { playerId: player.id })
  }

  return (
    <FancyButton className='text-2xl' color={ color } onClick={ onClick }>
      { player.name }
    </FancyButton>
  )
}

export default PlayerKickButton