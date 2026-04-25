import { QuizStep } from "@quizpot/quizcore"
import { useEditorQuiz } from "../providers/editor-quiz-provider"
import { DragDropContext, Draggable, Droppable, DropResult, Direction } from "@hello-pangea/dnd"
import StepNavigatorCard from "./step-navigation-card"
import NewQuestionDialog from "./new-question-dialog"
import NewSlideDialog from "./new-slide-dialog"
import FancyCard from "@/components/ui/fancy-card"
import { useState, useEffect } from 'react'
import { useEditorCurrentStep } from "../providers/editor-current-step-provider"
import { cn } from "@/lib/utils"

const reorder = (list: QuizStep[], startIndex: number, endIndex: number) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  return result
}

const StepNavigator = () => {
  const { quiz, setQuiz } = useEditorQuiz()
  const { setCurrentStep } = useEditorCurrentStep()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return
    if (result.source.index === result.destination.index) return

    const newSteps = reorder(
      quiz.steps,
      result.source.index,
      result.destination.index
    )

    setQuiz({ ...quiz, steps: newSteps })
    setCurrentStep(result.destination.index)
  }

  const droppableDirection: Direction = isMobile ? 'horizontal' : 'vertical'

  return (
    <div className={cn(
        'md:min-w-64 md:w-64 w-full flex flex-col shrink-0',
        isMobile ? 'h-auto' : 'md:h-full'
    )}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="steps-list" direction={droppableDirection}>
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={cn(
                "flex px-2 min-h-0",
                isMobile 
                  ? "flex-row overflow-x-auto overflow-y-hidden py-2 items-center" 
                  : "flex-col overflow-y-auto overflow-x-hidden h-full py-4"
              )}
            >
              {quiz.steps?.map((step, index) => (
                <Draggable
                  key={`step-${index}`}
                  draggableId={`step-${index}`}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={cn(
                        "shrink-0",
                        isMobile ? "min-w-[140px] h-full px-1" : "w-full mb-4"
                      )}
                    >
                      <StepNavigatorCard step={step} index={index} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <FancyCard color="background" className='flex flex-row md:flex-col gap-2 p-2 m-2 shrink-0'>
        <div className="flex-1">
          <NewQuestionDialog />
        </div>
        <div className="flex-1">
          <NewSlideDialog />
        </div>
      </FancyCard>
    </div>
  )
}

export default StepNavigator