"use client"

import { useEditorStep } from '@/components/editor/providers/editor-step-provider'
import TextInput from '@/components/ui/text-input'
import { ContentSlideLayout } from '@quizpot/quizcore'

const ContentSlideTitleEditor = () => {
  const { data, setData } = useEditorStep<ContentSlideLayout>()

  return (
    <TextInput 
      color='background' 
      className='text-3xl font-bold w-full text-center' 
      value={data.title} 
      placeholder="Slide Title"
      onChange={(e) => {
        setData({
          ...data,
          title: e.target.value
        })
      }} 
    />
  )
}

export default ContentSlideTitleEditor