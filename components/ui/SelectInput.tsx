import { colorStyles, ColorVariants } from '@/lib/client/colorVariants/ColorVariants'
import React from 'react'

const SelectInput = ({ 
  value, 
  onChange,
  variant,
  className,
  children
}: {
  value?: string, 
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void 
  variant?: ColorVariants,
  className?: string,
  children: React.ReactNode
}) => {
  if (!variant) {
    variant = 'gray'
  }

  const { parent: parentClassName, child: childClassName } = colorStyles[variant]

  if (variant === 'ghost') {
    return (
      <select onChange={ (e) => { onChange(e) } } value={ value }>
        { children }
      </select>
    )
  }
  
  return (
    <div className={`pb-0.5 ${className?.includes('w-full') ? 'w-full' : ''} rounded ` + parentClassName}>
      <select onChange={ (e) => { onChange(e) } } value={ value }
        className={`
          rounded px-2 py-1
          -translate-y-1
          focus:outline-none focus:border-0
          duration-200
        ` + childClassName + ' ' + className }>
        { children }
      </select>
    </div>
  )
}

export default SelectInput