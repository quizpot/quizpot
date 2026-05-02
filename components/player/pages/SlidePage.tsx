import TitleImageTextSlide from '@/components/host/slides/TitleImageTextSlide'
import TitleSlide from '@/components/host/slides/TitleSlide'
import FancyCard from '@/components/ui/fancy-card'
import MessagePage from '@/components/ui/message-page'
import { PlayerLobbyState, SlideLayout } from '@quizpot/quizcore'
import { useTranslations } from 'next-intl'

const SlidePage = ({ playerLobbyState }: { playerLobbyState: PlayerLobbyState }) => {
  const t = useTranslations('SlidePage')

  if (!playerLobbyState.lobbySettings.displayOnDevice) {
    return (
      <section 
        className='flex flex-col gap-4 items-center justify-center h-screen w-full p-4'
      >
        <FancyCard className='text-center text-4xl font-semibold mx-auto py-4 px-4'>
          { t('title') }
        </FancyCard>
      </section>
    )
  }

  const slideData = playerLobbyState.currentStep?.data as SlideLayout

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

  return <MessagePage message="Unknown slide ..." />
}

export default SlidePage