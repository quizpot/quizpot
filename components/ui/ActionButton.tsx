import Link from 'next/link'
import React, { ReactNode } from 'react'

export type ActionButtonVariant = 'green' | 'yellow' | 'blue' | 'red' | 'gray'
export const actionButtonVariants: ActionButtonVariant[] = ['green', 'yellow', 'blue', 'red', 'gray']

const ActionButton = (
  { actionName, onClick, href, variant, children, className }: 
  { actionName: string, onClick?: () => void, href?: string, variant?: ActionButtonVariant, children: ReactNode, className?: string }
) => {
  let parentClassName = ''
  let childClassName = ''

  if (variant === 'green' || !variant) {
    childClassName += ' bg-green-500 text-white'
    parentClassName += ' bg-green-600 text-green-600 group-hover:text-white'
  } else if (variant === 'yellow') {
    childClassName += ' bg-yellow-500 text-white'
    parentClassName += ' bg-yellow-600 text-yellow-600 group-hover:text-white'
  } else if (variant === 'blue') {
    childClassName += ' bg-blue-500 text-white'
    parentClassName += ' bg-blue-600 text-blue-600 group-hover:text-white'
  } else if (variant === 'gray') {
    childClassName += ' bg-neutral-100 text-black'
    parentClassName += ' bg-neutral-200 text-neutral-200 group-hover:text-black'
  } else if (variant === 'red') {
    childClassName += ' bg-red-500 text-white'
    parentClassName += ' bg-red-600 text-red-600 group-hover:text-white'
  }

  if (href) {
    return (
      <Link href={href}>
        <div className={'group'}>
          <div className={`
            rounded px-2 py-1 group-hover:rounded-b-none
            translate-y-4 group-hover:-translate-y-0 group-hover:group-active:translate-y-5
            duration-200
          ` + childClassName + ' ' + className}>
            { children }
          </div>
          <p className={'rounded-b duration-200 font-semibold' + parentClassName}>
            { actionName }
          </p>
        </div>
      </Link>
      
    )
  }

  if (onClick) {
    return (
      <button onClick={onClick}>
        <div className={'group'}>
          <div className={`
            rounded px-2 py-1 group-hover:rounded-b-none
            translate-y-4 group-hover:-translate-y-0 group-hover:group-active:translate-y-5 group-hover:group-active:rounded-b
            duration-200
          ` + childClassName + ' ' + className}>
            { children }
          </div>
          <p className={'rounded-b duration-200 font-semibold' + parentClassName}>
            { actionName }
          </p>
        </div>
      </button>
    )
  }
  
  return (
    <div>
      <div className={'group'}>
          <div className={`
            rounded px-2 py-1 group-hover:rounded-b-none
            translate-y-4 group-hover:-translate-y-0 group-hover:group-active:translate-y-5
            duration-200
          ` + childClassName + ' ' + className}>
            { children }
          </div>
          <p className={'rounded-b duration-200 font-semibold' + parentClassName}>
            { actionName }
          </p>
        </div>
    </div>
  )
}

export default ActionButton