import InvalidPage from './InvalidPage'
import TitleSlide from '../slides/TitleSlide'
import TitleImageTextSlide from '../slides/TitleImageTextSlide'
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
      <section className='h-full w-full'>
        <TitleSlide slide={ slideData } />
      </section>
    )
  }

  if (slideData.slideType === 'content') {
    return (
      <section className='h-full w-full'>
        <TitleImageTextSlide slide={ slideData } />
      </section>
    )
  }

  return <InvalidPage hostLobbyState={ hostLobbyState } message='Unsupported slide type. Press Space to skip.' />
}

export default SlidePage