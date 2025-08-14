import TextInput from '@/components/ui/TextInput'
import { Choice, MultipleChoiceQuestion } from '@/lib/misc/QuizFile'
import React, { useContext } from 'react'
import { EditorCurrentQuestionContext } from '../providers/EditorCurrentQuestionContext'
import { EditorQuizFileContext } from '../providers/EditorQuizFileContext'

const QuestionChoiceCard = ({ choice, index }: { choice: Choice, index: number }) => {
  const quizFileContext = useContext(EditorQuizFileContext)
  const currentQuestionIndexContext = useContext(EditorCurrentQuestionContext)

  if (!quizFileContext) {
    throw new Error("No quiz file context found")
  }

  if (!currentQuestionIndexContext) {
    throw new Error("No current question index context found")
  }

  const currentQuestionUntyped = quizFileContext.quizFile.questions[currentQuestionIndexContext.currentQuestionIndex]

  if (currentQuestionUntyped.questionType !== 'multipleChoice') {
    throw new Error("Invalid question type")
  }

  const currentQuestion = currentQuestionUntyped as MultipleChoiceQuestion;

  return (
    <div key={index} className='flex gap-2 justify-center items-center'>
      <TextInput 
        onChange={(e) => {
          const choices = [...currentQuestion.choices]
          choices[index].text = e.target.value
          quizFileContext.setQuizFile({
            ...quizFileContext.quizFile,
            questions: [
              ...quizFileContext.quizFile.questions.slice(0, currentQuestionIndexContext.currentQuestionIndex),
              {
                ...currentQuestion,
                choices: choices
              },
              ...quizFileContext.quizFile.questions.slice(currentQuestionIndexContext.currentQuestionIndex + 1)
            ]
          })
        }} 
        value={choice.text} />
      <input type="checkbox" name="" id="" className='h-8 w-8' 
        onChange={(e) => {
          const choices = [...currentQuestion.choices]
          choices[index].correct = e.target.checked
          quizFileContext.setQuizFile({
            ...quizFileContext.quizFile,
            questions: [
              ...quizFileContext.quizFile.questions.slice(0, currentQuestionIndexContext.currentQuestionIndex),
              {
                ...currentQuestion,
                choices: choices
              },
              ...quizFileContext.quizFile.questions.slice(currentQuestionIndexContext.currentQuestionIndex + 1)
            ]
          })
        }} 
        checked={choice.correct}
      />
    </div>
  )
}

export default QuestionChoiceCard