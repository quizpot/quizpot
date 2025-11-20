import { useTranslations } from 'next-intl'
import React from 'react'
import DisplayTimeoutEditor from './DisplayTimeoutEditor'
import AnswerTimeoutEditor from './AnswerTimeoutEditor'
import QuestionPointsEditor from './QuestionPointsEditor'

const QuestionSettings = ({ children }: { children?: React.ReactNode }) => {
  const t = useTranslations('QuestionSettings')

  return (
    <section className='w-96 max-h-[calc(100vh-58px)] h-[calc(100vh-58px)] flex flex-col gap-6 p-4'>
      <div className='flex flex-col gap-2'>
        <h1 className='text-xl'>{ t('displayTimeout') }</h1>
        <DisplayTimeoutEditor />
      </div>
      <div className='flex flex-col gap-2'>
        <h1 className='text-xl'>{ t('answerTimeout') }</h1>
        <AnswerTimeoutEditor />
      </div>
      <div className='flex flex-col gap-2'>
        <h1 className='text-xl'>{ t('points') }</h1>
        <QuestionPointsEditor />
      </div>
      { children }
    </section>
  )
}

export default QuestionSettings