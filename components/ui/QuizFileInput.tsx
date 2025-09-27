import { colorStyles, ColorVariants } from '@/lib/client/colorVariants/ColorVariants'
import React from 'react'

const QuizFileInput = ({ onChange, disabled, className, variant }: { onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, disabled?: boolean, className?: string, variant?: ColorVariants }) => {
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
        <input 
          type='file'
          accept=".qp, .json"
          placeholder='Upload quiz file'
          disabled={ disabled }
          onChange={ onChange } 
          className={`
            rounded px-2 py-1
            -translate-y-1 hover:-translate-y-1.5
            duration-200 select-none 
          ` + childClassName + ' ' + className} />
      </div>
    </div>
  )
}

export default QuizFileInput