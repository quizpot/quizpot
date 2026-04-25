import { cn } from "@/lib/utils"
import { useEditorQuiz } from "../providers/editor-quiz-provider"
import { useStepEditorSidebar } from "./sidebar/step-editor-sidebar-provider"

const StepEditor = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const { quiz } = useEditorQuiz()
  const { open } = useStepEditorSidebar()

  const backgroundHash = quiz.theme.background
  const backgroundUrl = backgroundHash ? quiz.images?.[backgroundHash] : null

  return (
    <div 
      className={ cn('flex-1 h-full min-h-0 md:rounded-tl-xl transition-all duration-300', open ? 'xl:rounded-tr-xl' : 'xl:rounded-tr-0', className) }
      style={{ 
        backgroundColor: quiz.theme.color,
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

export default StepEditor