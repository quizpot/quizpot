import FancyButton from './fancy-button'
import { Color } from '@/lib/colors'
import { cn } from '@/lib/utils'

const ColorInput = ({ 
  value, 
  className, 
  onChange,
  name,
  disabled,
  color
}: { 
  value?: string, 
  className?: string, 
  onChange?: any,
  name?: string,
  disabled?: boolean,
  color?: Color
}) => {
  return (
    <FancyButton color={ color } disabled={ disabled } asChild className={ cn('overflow-hidden h-11 w-full relative', className) }>
      <div className="flex items-center justify-between px-3 gap-3 w-full h-full">
        <div 
          className="w-6 h-6 rounded-md border border-black/10 shadow-sm shrink-0" 
          style={{ backgroundColor: value || '#000000' }}
        />
        <span className="font-mono text-sm uppercase opacity-60 flex-1 text-left">
          { value || '#000000' }
        </span>
        <input 
          type='color'
          disabled={ disabled }
          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
          onChange={ onChange } 
          value={ value || '#000000' }
          name={ name }
        />
      </div>
    </FancyButton>
  )
}

export default ColorInput