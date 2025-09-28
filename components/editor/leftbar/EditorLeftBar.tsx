"use client"
import React from 'react'
import QuestionCard from './ui/QuestionCard'
import { useEditorQuizFile } from '../providers/EditorQuizFileProvider'
import NewQuestionDialog from './ui/NewQuestionDialog'
import NewSlideDialog from './ui/NewSlideDialog'
import { DragDropContext, Draggable, Droppable, DropResult } from '@hello-pangea/dnd'
import { Question } from '@/lib/misc/QuizFile'

const reorder = (list: Question[], startIndex: number, endIndex: number) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  return result
}

const EditorLeftBar = () => {
  const { quizFile, setQuizFile } = useEditorQuizFile()

  const onDragEnd = (result: DropResult) => {
    // dropped outside the list
    if (!result.destination) {
      return
    }

    // Dropped at the same spot
    if (result.source.index === result.destination.index) {
      return
    }

    const newQuestions = reorder(
      quizFile.questions,
      result.source.index,
      result.destination.index
    )

    setQuizFile({ ...quizFile, questions: newQuestions })
  }

  return (
    <section className='hidden md:flex min-w-52 w-52 h-[calc(100vh_-_56px)] flex-col box-border'>
      <DragDropContext onDragEnd={ onDragEnd }>
        <Droppable droppableId="questions-list">
          {(provided) => (
            <div
              { ...provided.droppableProps }
              ref={ provided.innerRef }
              className='flex flex-col overflow-y-auto h-auto p-2'
            >
              {
                quizFile.questions.map((question, index) => (
                  <Draggable
                    key={ index }
                    draggableId={ `question-${index}` }
                    index={ index }
                  >
                    {(provided) => (
                      <div
                        ref={ provided.innerRef }
                        { ...provided.draggableProps }
                        { ...provided.dragHandleProps }
                      >
                        <QuestionCard question={ question } index={ index } />
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
      <div className='flex flex-col gap-4 p-4'>
        <NewQuestionDialog />
        <NewSlideDialog />
      </div>
    </section>
  )
}

export default EditorLeftBar