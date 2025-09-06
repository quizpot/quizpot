import { useEditorCurrentQuestion } from '@/components/editor/providers/EditorCurrentQuestionProvider'
import { useEditorQuizFile } from '@/components/editor/providers/EditorQuizFileProvider'
import { MultipleChoiceQuestion } from '@/lib/misc/QuizFile'
import React from 'react'

const QuestionChoiceRemove = () => {
  const { quizFile, setQuizFile } = useEditorQuizFile()
    const { currentQuestionIndex } = useEditorCurrentQuestion()
    const currentQuestion = quizFile.questions[currentQuestionIndex] as MultipleChoiceQuestion

  return (
    <button
      className={'p-4 text-center text-2xl ' + (currentQuestion.choices.length <= 2 ? ' hidden' : '')}
      onClick={() => {
        currentQuestion.choices.pop()

        setQuizFile({
          ...quizFile,
          questions: [
            ...quizFile.questions.slice(0, currentQuestionIndex),
            {
              ...currentQuestion,
              choices: currentQuestion.choices
            },
            ...quizFile.questions.slice(currentQuestionIndex + 1)
          ]
        })
      }}
    >
      Remove Choice
    </button>
  )
}

export default QuestionChoiceRemove