import { HostLobbyState } from '@/components/providers/HostLobbyStateProvider'
import InvalidPage from './InvalidPage'
import TitleSlide from '../slides/TitleSlide'
import SkipSlide from '../slides/SkipSlide'
import TitleImageTextSlide from '../slides/TitleImageTextSlide'
import HostStatusLayout from '../layouts/HostStatusLayout'

const SlidePage = ({ hostLobbyState }: { hostLobbyState: HostLobbyState }) => {
  if (hostLobbyState.currentQuestion?.questionType !== 'slide') 
    return <InvalidPage hostLobbyState={ hostLobbyState } message='Invalid question type for slide page.' />

  const slide = hostLobbyState.currentQuestion

  if (slide.layout.slideType === 'title') {
    return (
      <HostStatusLayout>
        <section className='h-full w-full'>
          <TitleSlide slide={ slide.layout } />
          <SkipSlide />
        </section>
      </HostStatusLayout>
    )
  }

  if (slide.layout.slideType === 'titleImageText') {
    return (
      <HostStatusLayout>
        <section className='h-full w-full'>
          <TitleImageTextSlide slide={ slide.layout } />
          <SkipSlide />
        </section>
      </HostStatusLayout>
    )
  }

  return (
    <HostStatusLayout>
      <InvalidPage hostLobbyState={ hostLobbyState } message='Unsupported slide type. Press Space to skip.' />
      <SkipSlide />
    </HostStatusLayout>
  )
}

export default SlidePage