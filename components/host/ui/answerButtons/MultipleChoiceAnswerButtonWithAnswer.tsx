import FancyButton from '@/components/ui/fancy-button'
import { Color } from '@/lib/colors'
import { Check, X } from 'lucide-react'
const MultipleChoiceAnswerButtonWithAnswer = ({ label, color, isCorrect }: { label: string, color: Color, isCorrect: boolean }) => {
  return (
    <div className={ (isCorrect ? 'opacity-100' : 'opacity-60') + ' w-full h-full' }>
      <FancyButton color={ color } className='w-full'>
        <div className='flex justify-between items-center w-full h-full p-8 text-4xl'>
          { label }
          { 
            isCorrect ? 
              <Check size={32} /> 
              :
              <X size={32} />
          }
        </div>
      </FancyButton>
    </div>
  )
}

export default MultipleChoiceAnswerButtonWithAnswer