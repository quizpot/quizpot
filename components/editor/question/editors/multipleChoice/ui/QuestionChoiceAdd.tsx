import { useEditorCurrentQuestion } from '@/components/editor/providers/EditorCurrentQuestionProvider'
import { useEditorQuizFile } from '@/components/editor/providers/EditorQuizFileProvider'
import Button from '@/components/ui/ButtonOld'
import { MultipleChoiceQuestion } from '@/lib/misc/QuizFile'
import React from 'react'

const QuestionChoiceAdd = () => {
  const { quizFile, setQuizFile } = useEditorQuizFile()
  const { currentQuestionIndex } = useEditorCurrentQuestion()
  const currentQuestion = quizFile.questions[currentQuestionIndex] as MultipleChoiceQuestion

  const onClick = () => {
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
  }

  return <Button onClick={ onClick } variant='green' className='w-full'>Add Choice</Button>
}

export default QuestionChoiceAdd