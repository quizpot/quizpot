import { getBackgroundStyles } from '@/lib/client/background-styles'
import HostStatusBar from '../ui/HostStatusBar'
import { useHostLobbyState } from '@/components/providers/host-ls-provder'
import MessagePage from '@/components/ui/message-page'

const HostStatusLayout = ({ children }: { children: React.ReactNode }) => {
  const { hostLobbyState } = useHostLobbyState()

  if (!hostLobbyState) {
    return <MessagePage message='Waiting for host lobby state...' />
  }

  return (
    <main
      className='h-dvh w-full flex flex-col gap-2'
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