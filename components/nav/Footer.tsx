import FancyButton from '../ui/fancy-button'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Color } from '@/lib/colors'

const Footer = ({ className, color }: { className?: string, color?: Color }) => {
  return (
    <footer className={ cn('p-4 flex items-center justify-center select-none', className) }>
      <FancyButton size='sm' color={ color } asChild>
        <Link href='https://quizpot.app' target='_blank' className='text-sm'>
          { new Date().getFullYear() } © Quizpot
        </Link>
      </FancyButton>
    </footer>
  )
}

export default Footer