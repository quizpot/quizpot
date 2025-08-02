import { MultipleChoiceQuestion } from '@/lib/QuizFile'
import React, { useContext } from 'react'
import { EditorQuizFileContext } from '../providers/EditorQuizFileContext'
import { EditorCurrentQuestionContext } from '../providers/EditorCurrentQuestionContext'

const QuestionChoiceAdd = () => {
  const quizFileContext = useContext(EditorQuizFileContext)
  const currentQuestionIndexContext = useContext(EditorCurrentQuestionContext)

  if (!quizFileContext) {
    throw new Error("No quiz file context found")
  }

  if (!currentQuestionIndexContext) {
    throw new Error("No current question index context found")
  }

  const { quizFile } = quizFileContext
  const { currentQuestionIndex } = currentQuestionIndexContext
  const currentQuestion = quizFile.questions[currentQuestionIndex] as MultipleChoiceQuestion

  return (
    <button
      className='p-4 text-center text-2xl' 
      onClick={() => {
        const newChoice = {
          text: "Another Choice",
          correct: false
        }

        const updatedChoices = [...currentQuestion.choices, newChoice]

        quizFileContext.setQuizFile({
          ...quizFileContext.quizFile,
          questions: [
            ...quizFileContext.quizFile.questions.slice(0, currentQuestionIndexContext.currentQuestionIndex),
            {
              ...currentQuestion,
              choices: updatedChoices
            },
            ...quizFileContext.quizFile.questions.slice(currentQuestionIndexContext.currentQuestionIndex + 1)
          ]
        })
      }}
    >
      Add Choice
    </button>
  )
}

export default QuestionChoiceAdd