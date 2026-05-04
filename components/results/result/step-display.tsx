"use client"
import { cn } from "@/lib/utils"
import { useResult } from "../providers/result-provider"

const StepDisplay = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const { result } = useResult()

  const backgroundHash = result.quiz.theme.background
  const backgroundUrl = backgroundHash ? result.quiz.images?.[backgroundHash] : null

  return (
    <div 
      className={ cn(
        'flex-1 h-full min-h-0 md:rounded-tl-xl xl:rounded-tr-0 flex flex-col p-4', 
        className
      ) }
      style={{ 
        backgroundColor: result.quiz.theme.color,
        backgroundImage: backgroundUrl 
          ? `linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), url(${backgroundUrl})` 
          : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      { children }
    </div>
  )
}

export default StepDisplay