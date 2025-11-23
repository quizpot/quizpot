import React from 'react'
import QuestionEditorLayout from '../../ui/QuestionEditorLayout'
import TrueFalseChoiceEditor from './ui/TrueFalseChoiceEditor'

const TrueFalseEditor = () => {
  return (
    <QuestionEditorLayout>
      <div className='grid grid-cols-2 p-4 gap-4'>
        <TrueFalseChoiceEditor v={ true } />
        <TrueFalseChoiceEditor v={ false } />
      </div>
    </QuestionEditorLayout>
  )
}

export default TrueFalseEditor