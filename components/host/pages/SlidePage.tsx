import InvalidPage from './InvalidPage'
import TitleSlide from '../slides/TitleSlide'
import TitleImageTextSlide from '../slides/TitleImageTextSlide'
import HostStatusLayout from '../layouts/HostStatusLayout'
import { HostLobbyState, isQuestion, SlideLayout } from '@quizpot/quizcore'
import MessagePage from '@/components/ui/message-page'

const SlidePage = ({ hostLobbyState }: { hostLobbyState: HostLobbyState }) => {
  const step = hostLobbyState.currentStep

  console.log(step?.type)

  if (!step || isQuestion(step)) {
    return <MessagePage message='No slide to display. Press Space to skip.' />
  }

  const slideData = step.data as SlideLayout

  if (slideData.slideType === 'title') {
    return (
      <HostStatusLayout>
        <section className='h-full w-full'>
          <TitleSlide slide={ slideData } />
        </section>
      </HostStatusLayout>
    )
  }

  if (slideData.slideType === 'content') {
    return (
      <HostStatusLayout>
        <section className='h-full w-full'>
          <TitleImageTextSlide slide={ slideData } />
        </section>
      </HostStatusLayout>
    )
  }

  return (
    <HostStatusLayout>
      <InvalidPage hostLobbyState={ hostLobbyState } message='Unsupported slide type. Press Space to skip.' />
    </HostStatusLayout>
  )
}

export default SlidePage