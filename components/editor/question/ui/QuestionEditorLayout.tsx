import React from 'react'
import QuestionImage from './QuestionImage'
import QuestionQuestionEditor from './QuestionQuestionEditor'
import { getBackgroundStyles } from '@/lib/client/BackgroundStyles'
import { useEditorQuizFile } from '../../providers/EditorQuizFileProvider'
import QuestionSettings from './QuestionSettings'

const QuestionEditorLayout = ({ children, settings }: { children: React.ReactNode, settings?: React.ReactNode }) => {
  const { quizFile } = useEditorQuizFile()

  return (
    <section className='max-h-[calc(100vh-58px)] h-[calc(100vh-58px)] w-full overflow-hidden flex'>
      <div className='h-full w-full flex justify-between flex-col gap-4' style={ getBackgroundStyles(quizFile.theme.background) }>
        <div className='p-4 shrink-0'>
          <QuestionQuestionEditor />
        </div>
        <div className='flex-grow flex items-center justify-center h-full'>
          <QuestionImage />
        </div>
        <div className='shrink-0 max-h-96 overflow-y-scroll'>
          { children }
        </div>
      </div>
      <QuestionSettings>
        { settings }
      </QuestionSettings>
    </section>
  )
}

export default QuestionEditorLayout