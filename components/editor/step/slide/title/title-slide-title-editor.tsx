"use client"

import { useEditorStep } from '@/components/editor/providers/editor-step-provider'
import TextInput from '@/components/ui/text-input'
import { TitleSlideLayout } from '@quizpot/quizcore'
import { useTranslations } from 'next-intl'

const TitleSlideTitleEditor = () => {
  const { data, setData } = useEditorStep<TitleSlideLayout>()
  const t = useTranslations('SlideEditor')

  return (
    <div className="w-full">
      <TextInput 
        color='background' 
        className='text-5xl font-bold w-full text-center py-6 placeholder:opacity-30' 
        value={data.title} 
        placeholder={t('title')}
        onChange={(e) => {
          setData({
            ...data,
            title: e.target.value
          })
        }} 
      />
    </div>
  )
}

export default TitleSlideTitleEditor