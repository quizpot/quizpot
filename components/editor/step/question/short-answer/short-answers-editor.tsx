'use client'

import { useEditorStep } from '@/components/editor/providers/editor-step-provider'
import FancyButton from '@/components/ui/fancy-button'
import { ShortAnswerQuestion } from '@quizpot/quizcore'
import ShortAnswerAnswerEditor from './short-answer-answer-editor'
import { useTranslations } from 'next-intl'

const ShortAnswersEditor = () => {
  const { data, setData } = useEditorStep<ShortAnswerQuestion>()
  const bt = useTranslations('Buttons')

  const canAdd = data.answers.length < 10 
  const canRemove = data.answers.length > 1

  const addAnswer = () => {
    if (!canAdd) return
    const answers = [...data.answers, '']
    setData({ ...data, answers })
  }

  const removeAnswer = () => {
    if (!canRemove) return
    const answers = [...data.answers]
    answers.pop()
    setData({ ...data, answers })
  }

  return (
    <section className='flex flex-col gap-4 max-h-80'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto p-1'>
        {data.answers.map((_, index) => (
          <ShortAnswerAnswerEditor key={index} index={index} />
        ))}
      </div>

      <div className='flex gap-4'>
        <FancyButton 
          color='green' 
          className='w-full disabled:opacity-50' 
          onClick={addAnswer}
          disabled={!canAdd}
        >
          {bt('addAnswer')}
        </FancyButton>
        <FancyButton 
          color='red' 
          className='w-full disabled:opacity-50' 
          onClick={removeAnswer}
          disabled={!canRemove}
        >
          {bt('removeAnswer')}
        </FancyButton>
      </div>
    </section>
  )
}

export default ShortAnswersEditor