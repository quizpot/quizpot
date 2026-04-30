"use client"
import { useHostLobbyState } from '@/components/providers/host-ls-provder'
import FancyCard from '@/components/ui/fancy-card'
import { LobbyStatus } from '@quizpot/quizcore'

const HostStatusBar = () => {
  const { hostLobbyState } = useHostLobbyState()

  if (!hostLobbyState) return null

  return (
    <section className='p-2 pb-4 w-full flex h-fit justify-between'>
      <FancyCard size='sm' className='select-none flex items-center justify-center'>{ window.location.href.replace('/host', '/play') }</FancyCard>
      <div className='flex gap-2'>
        <SkipSlideNotification />
        {
          hostLobbyState.status !== LobbyStatus.waiting && (
            <FancyCard size='sm' className='select-none flex items-center justify-center'>{ hostLobbyState.stepNumber } of { hostLobbyState.quizInfo.stepCount }</FancyCard>
          )
        }
      </div>
    </section>
  )
}

const SkipSlideNotification = () => {
  const { hostLobbyState } = useHostLobbyState()

  if (!hostLobbyState) return null

  if (hostLobbyState.status === 'waiting') return null

  return (
    <div className='flex items-center gap-2'>
      <FancyCard size='sm' className='flex gap-2 items-center justify-center'>
        <FancyCard size='sm' color='green' className='text-xs font-bold mb-2'>SPACE</FancyCard>
        to skip
      </FancyCard>
    </div>
  )
}

export default HostStatusBar