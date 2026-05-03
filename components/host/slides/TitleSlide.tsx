import FancyButton from '@/components/ui/fancy-button'
import { TitleSlideLayout } from '@quizpot/quizcore'

const TitleSlide = ({ slide }: { slide: TitleSlideLayout }) => {
  return (
    <section className='h-full w-full flex flex-col items-center justify-center gap-4 p-4'>
      <FancyButton className='text-5xl font-bold w-full text-center py-6'>
        { slide.title }
      </FancyButton>
      {
        slide.subtitle && (
          <FancyButton color='background' className='text-2xl w-full text-center'>
            { slide.subtitle }
          </FancyButton>
        )
      }
    </section>
  )
}

export default TitleSlide