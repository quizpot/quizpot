import { colorStyles, ColorVariants } from '@/lib/misc/ColorVariants'
import Link from 'next/link'
import React, { ReactNode } from 'react'

const Button = ({ 
  onClick, href, variant, children, className 
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

  if (href) {
    return (
      <Link href={href}>
        <div className={'pb-0.5 rounded ' + parentClassName}>
          <div className={`
            rounded px-2 py-1
            -translate-y-1 active:hover:-translate-y-0 hover:-translate-y-1.5
            duration-200 
          ` + childClassName + ' ' + className}>
            { children }
          </div>
        </div>
      </Link>
      
    )
  }

  if (onClick) {
    return (
      <button onClick={onClick}>
        <div className={'pb-0.5 rounded ' + parentClassName}>
          <div className={`
            rounded px-2 py-1
            -translate-y-1 active:hover:-translate-y-0 hover:-translate-y-1.5
            duration-200 
          ` + childClassName + ' ' + className}>
            { children }
          </div>
        </div>
      </button>
    )
  }
  
  return (
    <div>
      <div className={'pb-0.5 rounded ' + parentClassName}>
        <div className={`
          rounded px-2 py-1
          -translate-y-1 hover:-translate-y-1.5
          duration-200 select-none 
        ` + childClassName + ' ' + className}>
          { children }
        </div>
      </div>
    </div>
  )
}

export default Button