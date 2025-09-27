import { colorStyles, ColorVariants } from '@/lib/client/colorVariants/ColorVariants'
import React from 'react'

const TextAreaInput = ({ 
  value, 
  onChange,
  variant,
  className
}: { 
  value: string, 
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void 
  variant?: ColorVariants,
  className?: string
}) => {
  if (!variant) {
    variant = 'gray'
  }

  const { parent: parentClassName, child: childClassName } = colorStyles[variant]

  if (variant === 'ghost') {
    return (
      <textarea
        className={ className }
        onChange={(e) => { onChange(e) }} 
        defaultValue={ value }
      />
    )
  }

  return (
    <div className={`pb-0.5 ${className?.includes('w-full') ? 'w-full' : ''} rounded ` + parentClassName}>
      <textarea
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
  
  return (
    <textarea
      className='p-2 border-2 border-gray-400 rounded w-full'
      onChange={(e) => { onChange(e) }} 
      defaultValue={ value }
    />
  )
}

export default TextAreaInput