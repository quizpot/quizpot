import { EditorCurrentQuestionContext, EditorQuizFileContext } from '@/app/editor/page'
import React, { useContext } from 'react'
import QuestionChoiceCard from './QuestionChoiceCard'

const QuestionChoices = () => {
  const quizFileContext = useContext(EditorQuizFileContext)
  const currentQuestionIndexContext = useContext(EditorCurrentQuestionContext)

  if (!quizFileContext) {
    throw new Error("No quiz file context found")
  }

  if (!currentQuestionIndexContext) {
    throw new Error("No current question index context found")
  }

  const currentQuestion = quizFileContext.quizFile.questions[currentQuestionIndexContext.currentQuestionIndex]

  if (currentQuestion.questionType === 'multipleChoice') {
    return (
      <>
        {
          currentQuestion.choices.map((choice, index) => {
            return (
              <QuestionChoiceCard key={index} choice={choice} index={index} />
            )
          })
        }
      </>
    )
  } else if (currentQuestion.questionType === 'trueFalse') {
    return (
      <div>trueFalse</div>
    )
  }

  return (
    <div>none</div>
  )
}

export default QuestionChoices