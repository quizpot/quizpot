import { Color } from '@/lib/colors'
import React from 'react'
import FancyButton from './fancy-button'

const TextAreaInput = ({ 
  value, 
  onChange,
  color,
  className,
  placeholder,
}: { 
  value: string, 
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void 
  color?: Color,
  className?: string,
  placeholder?: string,
}) => {
  return (
    <FancyButton color={ color } asChild>
      <textarea
        className={ className }
        onChange={(e) => { onChange(e) }}
        placeholder={ placeholder }
        defaultValue={ value }
      />
    </FancyButton>
  )
}

export default TextAreaInput