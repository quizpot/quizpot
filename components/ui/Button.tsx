import Link from 'next/link'
import React, { ReactNode } from 'react'

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'green' | 'yellow' | 'blue' | 'red' | 'gray'

const Button = (
  { onClick, href, variant, children, className }: 
  { onClick?: () => void, href?: string, variant?: ButtonVariant, children: ReactNode, className?: string }
) => {
  let parentClassName = ''
  let childClassName = ''

  if (variant === 'primary' || !variant) {
    childClassName += ' bg-blue-500 text-white'
    parentClassName += ' bg-blue-600'
  } else if (variant === 'secondary') {
    childClassName += ' bg-neutral-100'
    parentClassName += ' bg-neutral-200'
  } else if (variant === 'danger') {
    childClassName += ' bg-red-500'
    parentClassName += ' bg-red-600'
  } else if (variant === 'green') {
    childClassName += ' bg-green-500 text-white'
    parentClassName += ' bg-green-600'
  } else if (variant === 'yellow') {
    childClassName += ' bg-yellow-500 text-white'
    parentClassName += ' bg-yellow-600'
  } else if (variant === 'blue') {
    childClassName += ' bg-blue-500 text-white'
    parentClassName += ' bg-blue-600'
  } else if (variant === 'gray') {
    childClassName += ' bg-neutral-100'
    parentClassName += ' bg-neutral-200'
  } else if (variant === 'red') {
    childClassName += ' bg-red-500 text-white'
    parentClassName += ' bg-red-600 text-white'
  }

  if (href) {
    return (
      <Link href={href}>
        <div className={'pb-0.5 rounded' + parentClassName}>
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
        <div className={'pb-0.5 rounded' + parentClassName}>
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
      <div className={'pb-0.5 rounded' + parentClassName}>
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