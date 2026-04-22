import { QuizStep } from "@quizpot/quizcore"
import { useEditorQuiz } from "../providers/editor-quiz-provider"
import { DragDropContext, Draggable, Droppable, DropResult, Direction } from "@hello-pangea/dnd"
import StepNavigatorCard from "./step-navigation-card"
import NewQuestionDialog from "./new-question-dialog"
import NewSlideDialog from "./new-slide-dialog"
import FancyCard from "@/components/ui/fancy-card"
import { useState, useEffect } from 'react'

const reorder = (list: QuizStep[], startIndex: number, endIndex: number) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  return result
}

const StepNavigator = () => {
  const { quiz, setQuiz } = useEditorQuiz()
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
  }

  const droppableDirection: Direction = isMobile ? 'horizontal' : 'vertical'

  return (
    <div className='md:min-w-64 md:w-64 w-full md:h-full flex flex-row md:flex-col'>
      <DragDropContext onDragEnd={ onDragEnd }>
        <Droppable droppableId="steps-list" direction={ droppableDirection }>
          {(provided) => (
            <div
              { ...provided.droppableProps }
              ref={ provided.innerRef }
              className={`flex ${isMobile ? 'flex-row overflow-x-auto overflow-y-hidden h-full py-2' : 'flex-col overflow-y-auto overflow-x-hidden h-auto'} px-2`}
            >
              {
                quiz.steps?.map((step, index) => (
                  <Draggable
                    key={ index }
                    draggableId={ `step-${index}` }
                    index={ index }
                  >
                    {(provided) => (
                      <div
                        ref={ provided.innerRef }
                        { ...provided.draggableProps }
                        { ...provided.dragHandleProps }
                      >
                        <StepNavigatorCard step={ step } index={ index } />
                      </div>
                    )}
                  </Draggable>
                ))
              }
              { provided.placeholder }
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <FancyCard color="background" className='flex flex-col gap-2 p-2 m-2'>
        <NewQuestionDialog />
        <NewSlideDialog />
      </FancyCard>
    </div>
  )
}

export default StepNavigator