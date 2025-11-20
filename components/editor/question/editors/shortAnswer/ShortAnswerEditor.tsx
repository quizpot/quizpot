import React from 'react'
import { ShortAnswerQuestion } from '@/lib/QuizFile'
import AddAnswerButton from './ui/AddAnswerButton'
import RemoveAnswerButton from './ui/RemoveAnswerButton'
import QuestionEditorLayout from '../../ui/QuestionEditorLayout'
import AnswerEditor from './ui/AnswerEditor'

const ShortAnswerEditor = ({ question }: { question: ShortAnswerQuestion }) => {
  return (
    <QuestionEditorLayout>
      <div className='max-h-64 grid grid-cols-2 gap-4 overflow-y-auto p-4'>
        {
          question.answers.map((answer, i) =>
            <AnswerEditor key={ i } index={ i } />
          )
        }
      </div>
      <div className='flex items-center justify-center gap-4 p-4'>
        <AddAnswerButton />
        <RemoveAnswerButton />
      </div>
    </QuestionEditorLayout>
  )
}

export default ShortAnswerEditor