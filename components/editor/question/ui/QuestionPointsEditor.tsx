import SelectInput from '@/components/ui/SelectInput'
import React from 'react'
import { useEditorQuizFile } from '../../providers/EditorQuizFileProvider'
import { useEditorCurrentQuestion } from '../../providers/EditorCurrentQuestionProvider'
import { QuestionPoints } from '@/lib/QuizFile'
import { useTranslations } from 'next-intl'

const QuestionPointsEditor = () => {
  const t = useTranslations('QuestionSettings')
  const { quizFile, setQuizFile } = useEditorQuizFile()
  const { currentQuestionIndex } = useEditorCurrentQuestion()
  const currentQuestion = quizFile.questions[currentQuestionIndex]

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const v: QuestionPoints = e.target.value as QuestionPoints
    const updatedQuestions = [...quizFile.questions]

    if (updatedQuestions[currentQuestionIndex].questionType === 'slide') return
    
    updatedQuestions[currentQuestionIndex] = {
      ...updatedQuestions[currentQuestionIndex],
      points: v
    }

    setQuizFile({ ...quizFile, questions: updatedQuestions })
  }

  if (currentQuestion.questionType === 'slide') return <></>

  return (
    <SelectInput onChange={ onChange } value={ currentQuestion.points }>
      <option value='normalPoints'>{ t('normal') }</option>
      <option value='doublePoints'>{ t('double') }</option>
      <option value='noPoints'>{ t('none') }</option>
    </SelectInput>
  )
}

export default QuestionPointsEditor