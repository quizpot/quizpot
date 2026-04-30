import FancyCard from '@/components/ui/fancy-card'
import { getBackgroundStyles } from '@/lib/client/background-styles'
import { HostLobbyState } from '@quizpot/quizcore'

const InvalidPage = ({ hostLobbyState, message }: { hostLobbyState: HostLobbyState, message: string }) => {
  return (
    <section 
      className='flex flex-col gap-4 items-center justify-center max-h-screen h-screen w-full p-4'
      style={ getBackgroundStyles(hostLobbyState.quizInfo.theme) }
    >
      <FancyCard className='text-center text-4xl font-semibold w-full py-4 px-4'>
        { message }
      </FancyCard>
    </section>
  )
}

export default InvalidPage