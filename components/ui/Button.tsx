import Link from 'next/link'
import React, { ReactNode } from 'react'

export type ButtonVariant = 'primary' | 'secondary' | 'danger'

const Button = (
  { onClick, href, variant, children, className }: 
  { onClick?: () => void, href?: string, variant?: ButtonVariant, children: ReactNode, className?: string }
) => {
  // Default button classes
  var defaultClassName = 'py-2 px-4 rounded shadow text-center font-medium select-none cursor-pointer ' + className

  // Handle variants
  if (variant === 'primary' || !variant) {
    defaultClassName += ' bg-blue-500 hover:bg-blue-600 text-white'
  } else if (variant === 'secondary') {
    defaultClassName += ' bg-white hover:bg-gray-200 text-black'
  } else if (variant === 'danger') {
    defaultClassName += ' bg-red-500 hover:bg-red-600 text-white'
  }

  // Return link if href is set
  if (href) {
    return (
      <Link href={href} className={ defaultClassName }>
        { children }
      </Link>
    )
  }

  // Return button if onClick is set
  if (onClick) {
    return (
      <button className={ defaultClassName } onClick={onClick}>
        { children }
      </button>
    )
  }
  
  // Return div as a placeholder button with no action
  return (
    <div className={ defaultClassName }>
      { children }
    </div>
  )
}

export default Button