import FancyCard from '@/components/ui/fancy-card'
import { ContentSlideLayout } from '@quizpot/quizcore'
import Image from 'next/image'

const TitleImageTextSlide = ({ slide }: { slide: ContentSlideLayout }) => {
  return (
    <section className='h-full w-full flex flex-col items-center justify-center gap-4 p-4'>
      <FancyCard className='text-center text-4xl font-semibold w-full py-4 px-4'>
        { slide.title }
      </FancyCard>
      <div className='flex items-center justify-center p-4 w-full h-full'>
        {
          slide.imageHash && (
            <section className='flex items-center justify-center h-full w-full'>
              <div className='w-full h-full flex flex-col items-center justify-center gap-4'>
                <div className='relative w-full h-full'>
                  <Image
                    alt='Slide Image'
                    src={ slide.imageHash }
                    fill={ true }
                    className='object-contain'
                  />
                </div>
              </div>
            </section>
          )
        }
      </div>
      <FancyCard className='text-xl w-full py-4 px-4'>
        { slide.text }
      </FancyCard>
    </section>
  )
}

export default TitleImageTextSlide