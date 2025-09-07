import { useEditorCurrentQuestion } from '@/components/editor/providers/EditorCurrentQuestionProvider'
import { useEditorQuizFile } from '@/components/editor/providers/EditorQuizFileProvider'
import BooleanInput from '@/components/ui/BooleanInput'
import Button from '@/components/ui/Button'
import TextInput from '@/components/ui/TextInput'
import { multipleChoiceVariants } from '@/lib/misc/colorVariants/MultipleChoiceVariants'
import { MultipleChoiceQuestion } from '@/lib/misc/QuizFile'
import React from 'react'

const MultipleChoiceQuestionChoiceInput = ({ index }: { index: number }) => {
  const { quizFile, setQuizFile } = useEditorQuizFile()
  const { currentQuestionIndex } = useEditorCurrentQuestion()
  const currentQuestion = quizFile.questions[currentQuestionIndex] as MultipleChoiceQuestion
  const choice = currentQuestion.choices[index]

  const onTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const choices = [...currentQuestion.choices]
    choices[index].text = e.target.value
    setQuizFile({
      ...quizFile,
      questions: [
        ...quizFile.questions.slice(0, currentQuestionIndex),
        {
          ...currentQuestion,
          choices: choices
        },
        ...quizFile.questions.slice(currentQuestionIndex + 1)
      ]
    })
  }

  const onCheckboxChange = (value: boolean) => {
    const choices = [...currentQuestion.choices]
    choices[index].correct = value
    setQuizFile({
      ...quizFile,
      questions: [
        ...quizFile.questions.slice(0, currentQuestionIndex),
        {
          ...currentQuestion,
          choices: choices
        },
        ...quizFile.questions.slice(currentQuestionIndex + 1)
      ]
    })
  }

  return (
    <Button variant={ multipleChoiceVariants[index % multipleChoiceVariants.length] }>
      <div className='w-full flex justify-between items-center p-4 text-2xl'> 
        <TextInput onChange={ onTextChange } value={ choice.text } variant='ghost' className='w-full h-full focus:outline-0' />
        <div className='rounded-full border-2 border-current'>
          <BooleanInput onChange={ onCheckboxChange } value={ choice.correct } />
        </div>
      </div>
    </Button>
  )
}

export default MultipleChoiceQuestionChoiceInput