"use client"

import { useTranslations } from 'next-intl'
import { ContentSlideLayout } from '@quizpot/quizcore'
import { useEditorStep } from '@/components/editor/providers/editor-step-provider'
import TextAreaInput from '@/components/ui/textarea-input'

const ContentSlideTextEditor = () => {
  const { data, setData } = useEditorStep<ContentSlideLayout>()
  const t = useTranslations('SlideEditor')

  return (
    <section className='w-full'>
      <TextAreaInput
        color='background'
        className='text-xl w-full min-h-[120px] max-h-[400px] text-left p-4' 
        value={data.text || ''} 
        placeholder={t('text')}
        onChange={(e) => {
          setData({
            ...data,
            text: e.target.value
          })
        }} 
      />
    </section>
  )
}

export default ContentSlideTextEditor