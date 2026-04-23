import React from 'react'
import { useEditorQuiz } from '../providers/editor-quiz-provider'
import { cn } from '@/lib/utils'
import { useStepEditorSidebar } from './sidebar/step-editor-sidebar-provider'

const StepEditor = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const { quiz } = useEditorQuiz()
  const { open } = useStepEditorSidebar()

  return (
    <div 
      className={ cn('flex-1 h-full min-h-0 md:rounded-tl-xl transition-all duration-300', open ? 'xl:rounded-tr-xl' : 'xl:rounded-tr-0', className) }
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