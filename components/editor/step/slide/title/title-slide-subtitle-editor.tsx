"use client"

import { useEditorStep } from '@/components/editor/providers/editor-step-provider'
import TextInput from '@/components/ui/text-input'
import { TitleSlideLayout } from '@quizpot/quizcore'
import { useTranslations } from 'next-intl'

const TitleSlideSubtitleEditor = () => {
  const { data, setData } = useEditorStep<TitleSlideLayout>()
  const t = useTranslations('SlideEditor')

  return (
    <div className="w-full">
      <TextInput 
        color='foreground' 
        className='text-2xl w-full text-center placeholder:opacity-20' 
        value={data.subtitle || ''} 
        placeholder={t('subtitle')}
        onChange={(e) => {
          setData({
            ...data,
            subtitle: e.target.value
          })
        }} 
      />
    </div>
  )
}

export default TitleSlideSubtitleEditor