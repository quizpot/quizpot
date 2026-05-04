"use client"
import StepNavigatorCard from "./step-navigation-card"
import { useState, useEffect } from 'react'
import { cn } from "@/lib/utils"
import { useResult } from "../providers/result-provider"

const StepNavigator = () => {
  const { result } = useResult()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const itemWrapperClass = cn(
    "shrink-0",
    isMobile ? "min-w-[140px] h-full px-1" : "w-full mb-4"
  )

  return (
    <div className={cn(
      'md:min-w-64 md:w-64 w-full flex flex-col shrink-0',
      isMobile ? 'h-auto' : 'md:h-full'
    )}>
      <div className={cn(
        "flex p-2 min-h-0",
        isMobile
          ? "flex-row overflow-x-auto overflow-y-hidden items-center"
          : "flex-col overflow-y-auto overflow-x-hidden h-full"
      )}>
        <div className={itemWrapperClass}>
          <StepNavigatorCard index={null} />
        </div>

        {result.quiz.steps?.map((step, index) => (
          <div
            key={`step-${index}`}
            className={itemWrapperClass}
          >
            <StepNavigatorCard step={step} index={index} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default StepNavigator