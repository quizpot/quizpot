import { useHostLobbyState } from '@/components/providers/HostLobbyStateProvider'
import { getBackgroundStyles } from '@/lib/client/BackgroundStyles'
import HostStatusBar from '../ui/HostStatusBar'

const HostStatusLayout = ({ children }: { children: React.ReactNode }) => {
  const { hostLobbyState } = useHostLobbyState()

  if (!hostLobbyState) return null

  return (
    <main
      className='h-dvh w-full grid grid-cols-1 grid-rows-[1fr_56px]'
      style={ getBackgroundStyles(hostLobbyState.theme.background) }
    >
      { children }
      <HostStatusBar />
    </main>
  )
}

export default HostStatusLayout