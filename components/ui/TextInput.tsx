import { colorStyles, ColorVariants } from '@/lib/misc/colorVariants/ColorVariants'
import React from 'react'

const TextInput = ({ 
  value, 
  onChange,
  variant,
  className
}: { 
  value: string, 
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void 
  variant?: ColorVariants,
  className?: string
}) => {
  if (!variant) {
    variant = 'gray'
  }

  const { parent: parentClassName, child: childClassName } = colorStyles[variant]

  if (variant === 'ghost') {
    return (
      <input 
        type='text'
        className={ className }
        onChange={ (e) => { onChange(e) } } 
        value={ value }
      />
    )
  }
  
  return (
    <div className={`pb-0.5 ${className?.includes('w-full') ? 'w-full' : ''} rounded ` + parentClassName}>
      <input 
        type='text'
        className={`
          rounded px-2 py-1
          -translate-y-1
          focus:outline-none focus:border-0
          duration-200
        ` + childClassName + ' ' + className }
        onChange={(e) => { onChange(e) }} 
        value={ value }
      />
    </div>
  )
}

export default TextInput