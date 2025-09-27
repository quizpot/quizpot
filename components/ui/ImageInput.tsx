import { colorStyles, ColorVariants } from '@/lib/client/colorVariants/ColorVariants'
import React from 'react'

const ImageInput = ({ 
  onChange,
  variant,
  className
}: { 
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  variant?: ColorVariants,
  className?: string
}) => {
  if (!variant) {
    variant = 'gray'
  }

  const { parent: parentClassName, child: childClassName } = colorStyles[variant]
  
  return (
    <div className={`pb-0.5 ${className?.includes('w-full') ? 'w-full' : ''} rounded ` + parentClassName}>
      <input 
        type='file'
        accept='image/*'
        className={`
          rounded px-2 py-1
          -translate-y-1
          focus:outline-none focus:border-0
          duration-200 w-full 
        ` + childClassName + ' ' + className }
        onChange={(e) => { onChange(e) }} 
      />
    </div>
  )
}

export default ImageInput