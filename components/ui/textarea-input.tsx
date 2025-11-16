import { Color } from '@/lib/Colors'
import React from 'react'
import FancyButton from './fancy-button'

const TextAreaInput = ({ 
  value, 
  onChange,
  color,
  className
}: { 
  value: string, 
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void 
  color?: Color,
  className?: string
}) => {
  return (
    <FancyButton color={ color } asChild>
      <textarea
        className={ className }
        onChange={(e) => { onChange(e) }} 
        defaultValue={ value }
      />
    </FancyButton>
  )
}

export default TextAreaInput