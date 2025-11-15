import { useEditorCurrentQuestion } from '@/components/editor/providers/EditorCurrentQuestionProvider'
import { useEditorQuizFile } from '@/components/editor/providers/EditorQuizFileProvider'
import Button from '@/components/ui/ButtonOld'
import { MultipleChoiceQuestion } from '@/lib/misc/QuizFile'
import React from 'react'

const QuestionChoiceRemove = () => {
  const { quizFile, setQuizFile } = useEditorQuizFile()
  const { currentQuestionIndex } = useEditorCurrentQuestion()
  const currentQuestion = quizFile.questions[currentQuestionIndex] as MultipleChoiceQuestion

  const onClick = () => {
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
  }

  if (currentQuestion.choices.length <= 2) {
    return null
  }

  return <Button onClick={ onClick } variant='red' className='w-full'>Remove Choice</Button>
}

export default QuestionChoiceRemove