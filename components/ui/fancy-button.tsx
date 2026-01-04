"use client"
import { Color, colors } from '@/lib/Colors'
import { cn } from '@/lib/utils'
import { Slot } from '@radix-ui/react-slot'
import React from 'react'

const FancyButton = ({ 
  color, size, className, asChild, disabled, onClick, ...props 
}: React.ComponentProps<"button"> & { 
  color?: Color, size?: 'sm' | 'lg', className?: string, asChild?: boolean 
}) => {
  if (!color) color = 'gray'
  const { cls } = colors[color]

  let padding = 'px-4 py-2'

  if (size === 'sm') {
    padding = 'px-2 py-1'
  } else if (size === 'lg') {
    padding = 'px-8 py-4'
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (disabled) {
      e.preventDefault()
      return
    }

    onClick?.(e)
  }

  const Comp = asChild ? Slot : 'button'

  return (
    <Comp data-slot="button" disabled={ disabled } aria-disabled={ disabled } onClick={ handleClick } className={ cn(`
      font-medium px-4 py-2 duration-200 rounded-lg
      shadow-[0_8px] hover:shadow-[0_12px] hover:-translate-y-1 active:translate-y-1 active:shadow-[0_4px]
    `, padding, className, cls,
      disabled && "opacity-50 cursor-not-allowed select-none hover:translate-y-0 active:translate-y-0 hover:shadow-[0_8px] active:shadow-[0_8px]",
    ) } { ...props } />
  )
}

export default FancyButton