import FancyCard from '@/components/ui/fancy-card'
import { Color, colorIcons } from '@/lib/colors'

const MultipleChoiceAnswerButton = ({ label, color }: { label: string, color: Color }) => {
  const Icon = colorIcons[color as keyof typeof colorIcons]
  return (
    <FancyCard color={ color } className='flex w-full h-full p-6 items-center text-3xl gap-4'>
      <Icon size={32} />
      { label }
    </FancyCard>
  )
}

export default MultipleChoiceAnswerButton