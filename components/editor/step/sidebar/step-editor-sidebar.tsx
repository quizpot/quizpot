"use client"

import { cn } from "@/lib/utils"
import { useStepEditorSidebar } from "./step-editor-sidebar-provider"
import StepEditorSidebarToggle from "./step-editor-sidebar-toggle"

const StepEditorSidebar = ({ children }: { children: React.ReactNode }) => {
  const { open } = useStepEditorSidebar()
  
  return (
    <section className={cn(
      'transition-all duration-300 overflow-hidden shrink-0 bg-background shadow-2xl xl:shadow-none',
      'absolute right-0 h-full xl:relative xl:h-auto',
      open ? 'w-full md:w-96 border-l' : 'w-0 border-l-0',
    )}>
      <div className="w-full flex flex-col gap-4 xl:w-96 h-full overflow-y-auto p-4">
        <div className="flex xl:hidden items-start h-13">
          <StepEditorSidebarToggle className="h-full" />
        </div>
        { children }
      </div>
    </section>
  )
}

export default StepEditorSidebar