import { MultipleChoiceQuestion } from '@/lib/misc/QuizFile'
import React, { useContext } from 'react'
import { EditorQuizFileContext } from '../providers/EditorQuizFileContext'
import { EditorCurrentQuestionContext } from '../providers/EditorCurrentQuestionContext'

const QuestionChoiceRemove = () => {
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
      className={'p-4 text-center text-2xl ' + (currentQuestion.choices.length <= 2 ? ' hidden' : '')}
      onClick={() => {
        currentQuestion.choices.pop()

        quizFileContext.setQuizFile({
          ...quizFileContext.quizFile,
          questions: [
            ...quizFileContext.quizFile.questions.slice(0, currentQuestionIndexContext.currentQuestionIndex),
            {
              ...currentQuestion,
              choices: currentQuestion.choices
            },
            ...quizFileContext.quizFile.questions.slice(currentQuestionIndexContext.currentQuestionIndex + 1)
          ]
        })
      }}
    >
      Remove Choice
    </button>
  )
}

export default QuestionChoiceRemove