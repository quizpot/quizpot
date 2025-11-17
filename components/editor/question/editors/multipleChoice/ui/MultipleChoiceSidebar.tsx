import { useEditorCurrentQuestion } from '@/components/editor/providers/EditorCurrentQuestionProvider'
import { useEditorQuizFile } from '@/components/editor/providers/EditorQuizFileProvider'
import NumberInput from '@/components/ui/number-input'
import SelectInput from '@/components/ui/SelectInput'
import { MultipleChoiceQuestion, QuestionPoints } from '@/lib/QuizFile'
import React from 'react'

const MultipleChoiceSidebar = () => {
  const { quizFile, setQuizFile } = useEditorQuizFile()
  const { currentQuestionIndex } = useEditorCurrentQuestion()
  const currentQuestion = quizFile.questions[currentQuestionIndex] as MultipleChoiceQuestion

  const onQuestionDisplayTimeoutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedQuestions = [...quizFile.questions]

    if (updatedQuestions[currentQuestionIndex].questionType !== 'multipleChoice') return

    updatedQuestions[currentQuestionIndex] = {
      ...updatedQuestions[currentQuestionIndex],
      questionDisplayTime: Number.parseInt(e.target.value)
    }

    setQuizFile({ ...quizFile, questions: updatedQuestions })
  }

  const onQuestionTimeoutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedQuestions = [...quizFile.questions]

    if (updatedQuestions[currentQuestionIndex].questionType !== 'multipleChoice') return

    updatedQuestions[currentQuestionIndex] = {
      ...updatedQuestions[currentQuestionIndex],
      timeLimit: Number.parseInt(e.target.value)
    }

    setQuizFile({ ...quizFile, questions: updatedQuestions })
  }

  const onQuestionPointsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const v: QuestionPoints = e.target.value as QuestionPoints
    const updatedQuestions = [...quizFile.questions]

    if (updatedQuestions[currentQuestionIndex].questionType !== 'multipleChoice') return
    
    updatedQuestions[currentQuestionIndex] = {
      ...updatedQuestions[currentQuestionIndex],
      points: v
    }

    setQuizFile({ ...quizFile, questions: updatedQuestions })
  }

  return (
    <section className='w-96 max-h-[calc(100vh-58px)] h-[calc(100vh-58px)] flex flex-col gap-4 p-4'>
      <div className='flex flex-col gap-2'>
        <h1 className='text-xl'>Display Timeout</h1>
        <NumberInput onChange={ onQuestionDisplayTimeoutChange } value={ currentQuestion.questionDisplayTime } />
      </div>
      <div className='flex flex-col gap-2'>
        <h1 className='text-xl'>Answer Timeout</h1>
        <NumberInput onChange={ onQuestionTimeoutChange } value={ currentQuestion.timeLimit } />
      </div>
      <div className='flex flex-col gap-2'>
        <h1 className='text-xl'>Points</h1>
        <SelectInput onChange={ onQuestionPointsChange } value={ currentQuestion.points } className='w-full'>
          <option value='normalPoints'>Normal</option>
          <option value='doublePoints'>Double</option>
          <option value='noPoints'>None</option>
        </SelectInput>
      </div>
    </section>
  )
}

export default MultipleChoiceSidebar