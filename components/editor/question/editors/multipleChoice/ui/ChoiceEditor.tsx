import { useEditorCurrentQuestion } from '@/components/editor/providers/EditorCurrentQuestionProvider'
import { useEditorQuizFile } from '@/components/editor/providers/EditorQuizFileProvider'
import BooleanInput from '@/components/ui/BooleanInput'
import TextInput from '@/components/ui/TextInput'
import { colorKeys } from '@/lib/Colors'
import { MultipleChoiceQuestion } from '@/lib/QuizFile'
import { Check, X } from 'lucide-react'
import React from 'react'

const ChoiceEditor = ({ index }: { index: number }) => {
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
    <section className='flex gap-4'>
      <TextInput 
        color={ colorKeys[index % 8] } 
        onChange={ onTextChange } 
        value={ choice.text } 
        className='text-2xl px-8 py-4 w-full' 
      />
      <BooleanInput onChange={ onCheckboxChange } value={ choice.correct }>
        { choice.correct ? <Check /> : <X /> }
      </BooleanInput>
    </section>
  )
}

export default ChoiceEditor