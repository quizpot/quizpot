import React from 'react'
import { useEditorQuiz } from '../providers/editor-quiz-provider'
import { cn } from '@/lib/utils'

const StepEditor = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const { quiz } = useEditorQuiz()

  return (
    <div 
      className={ cn('w-full h-full md:rounded-tl-xl xl:rounded-tr-xl', className) }
      style={{ 
        backgroundColor: quiz.theme.color,
        backgroundImage: `url(${quiz.theme.background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      { children }
    </div>
  )
}

export default StepEditor