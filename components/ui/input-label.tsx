import React from 'react'
import FancyCard from './fancy-card'
import { cn } from '@/lib/utils'
import { Color } from '@/lib/Colors'

const InputLabel = ({
  label,
  className,
  color
}: {
  label: string,
  className?: string,
  color?: Color
}) => {
  return (
    <FancyCard 
      className={ cn('text-xs px-2 py-1', className) }
      color={ color }
    >
      { label }
    </FancyCard>
  )
}

export default InputLabel