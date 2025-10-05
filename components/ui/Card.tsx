import { colorStyles, ColorVariants } from '@/lib/client/colorVariants/ColorVariants'
import React, { ReactNode } from 'react'

const Card = ({ 
  variant, children, className 
}: { 
  onClick?: () => void, 
  href?: string, 
  variant?: ColorVariants, 
  children: ReactNode, 
  className?: string 
}) => {
  if (!variant) {
    variant = 'gray'
  }

  const { parent: parentClassName, child: childClassName } = colorStyles[variant]

  return (
    <div className={
      (className?.includes('w-full') ? ' w-full ' : '') + 
      (className?.includes('h-full') ? ' h-full ' : '') 
    }>
      <div className={'pb-0.5 rounded ' + parentClassName +
        (className?.includes('w-full') ? ' w-full ' : '') + 
        (className?.includes('h-full') ? ' h-full ' : '') 
      }>
        <div className={`
          rounded
          -translate-y-1 hover:-translate-y-1.5
          duration-200 select-none 
        ` + childClassName + ' ' + className}>
          { children }
        </div>
      </div>
    </div>
  )
}

export default Card