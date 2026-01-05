"use client"
import { useHostLobbyState } from '@/components/providers/HostLobbyStateProvider'
import FancyCard from '@/components/ui/fancy-card'

const HostStatusBar = () => {
  const { hostLobbyState } = useHostLobbyState()

  if (!hostLobbyState) return null

  return (
    <section className='p-2 pb-4 w-full flex h-fit justify-between'>
      <FancyCard size='sm'>{ window.location.href.replace('/host', '') }/play?code={ hostLobbyState.code }</FancyCard>
      { hostLobbyState.currentQuestion?.questionType === 'slide' ? (
        <div className='flex items-center gap-2'><FancyCard size='sm' color='green' className='text-sm font-bold'>SPACE</FancyCard><FancyCard size='sm'>to skip Slide</FancyCard></div>
      ) : null }
      <FancyCard size='sm'>{ hostLobbyState.currentQuestionNumber } of { hostLobbyState.totalQuestions }</FancyCard>
    </section>
  )
}

export default HostStatusBar