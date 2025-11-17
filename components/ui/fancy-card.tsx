import { Color, colors } from '@/lib/Colors'
import { cn } from '@/lib/utils'
import { Slot } from '@radix-ui/react-slot'
import React from 'react'

const FancyCard = ({ 
  color, size, className, asChild, ...props 
}: React.ComponentProps<"div"> & { 
  color?: Color, size?: 'sm' | 'lg', className?: string, asChild?: boolean 
}) => {
  if (!color) color = 'ghost'
  const { cls } = colors[color]

  let padding = 'px-4 py-2'

  if (size === 'sm') {
    padding = 'px-2 py-1'
  } else if (size === 'lg') {
    padding = 'px-8 py-4'
  }

  const Comp = asChild ? Slot : 'div'

  return (
    <Comp data-slot="div" className={cn(`
      font-medium px-4 py-2 duration-200 rounded-lg
      shadow-[0_8px]
    `, padding, className, cls) } { ...props } />
  )
}

export default FancyCard