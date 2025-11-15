import { useEditorCurrentQuestion } from '@/components/editor/providers/EditorCurrentQuestionProvider'
import { useEditorQuizFile } from '@/components/editor/providers/EditorQuizFileProvider'
import BooleanInput from '@/components/ui/BooleanInput'
import Button from '@/components/ui/ButtonOld'
import { trueFalseVariants } from '@/lib/client/colorVariants/TrueFalseVariants'
import { TrueFalseQuestion } from '@/lib/misc/QuizFile'
import React from 'react'

const TrueFalseChoiceInput = ({ v }: { v: boolean }) => {
  const { quizFile, setQuizFile } = useEditorQuizFile()
  const { currentQuestionIndex } = useEditorCurrentQuestion()
  const currentQuestion = quizFile.questions[currentQuestionIndex] as TrueFalseQuestion

  const onCheckboxChange = () => {
    const newAnswer = currentQuestion.answer === v ? !v : v

    setQuizFile({
      ...quizFile,
      questions: [
        ...quizFile.questions.slice(0, currentQuestionIndex),
        {
          ...currentQuestion,
          answer: newAnswer,
        },
        ...quizFile.questions.slice(currentQuestionIndex + 1)
      ]
    })
  }

  return (
    <Button variant={ trueFalseVariants[v ? 0 : 1] }>
      <div className='w-full flex justify-between items-center p-4 text-2xl'> 
        <h1 className='w-full h-full focus:outline-0'>
          { v ? 'True' : 'False' }
        </h1>
        <div className='rounded-full border-2 border-current'>
          <BooleanInput onChange={ onCheckboxChange } value={ currentQuestion.answer === v } />
        </div>
      </div>
    </Button>
  )
}

export default TrueFalseChoiceInput