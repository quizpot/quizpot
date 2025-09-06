import { useEditorCurrentQuestion } from '@/components/editor/providers/EditorCurrentQuestionProvider'
import { useEditorQuizFile } from '@/components/editor/providers/EditorQuizFileProvider'
import { MultipleChoiceQuestion } from '@/lib/misc/QuizFile'
import React from 'react'

const QuestionChoiceAdd = () => {
  const { quizFile, setQuizFile } = useEditorQuizFile()
  const { currentQuestionIndex } = useEditorCurrentQuestion()
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

        setQuizFile({
          ...quizFile,
          questions: [
            ...quizFile.questions.slice(0, currentQuestionIndex),
            {
              ...currentQuestion,
              choices: updatedChoices
            },
            ...quizFile.questions.slice(currentQuestionIndex + 1)
          ]
        })
      }}
    >
      Add Choice
    </button>
  )
}

export default QuestionChoiceAdd