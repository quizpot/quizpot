import { getBackgroundStyles } from '@/lib/client/background-styles'
import HostStatusBar from '../ui/HostStatusBar'
import { useHostLobbyState } from '@/components/providers/host-ls-provder'

const HostStatusLayout = ({ children }: { children: React.ReactNode }) => {
  const { hostLobbyState } = useHostLobbyState()

  if (!hostLobbyState) return null

  return (
    <main
      className='h-dvh w-full grid grid-cols-1 grid-rows-[1fr_56px]'
      style={ getBackgroundStyles(hostLobbyState.quizInfo.theme) }
    >
      <div className='w-full h-full overflow-y-hidden'>
        { children }
      </div>
      <HostStatusBar />
    </main>
  )
}

export default HostStatusLayout