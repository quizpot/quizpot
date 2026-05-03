"use client"

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import { useEditorQuiz } from '@/components/editor/providers/editor-quiz-provider'
import TextInput from '@/components/ui/text-input'
import ImageInput from '@/components/ui/ImageInput'
import { useTranslations } from 'next-intl'
import { Loader2, X } from 'lucide-react'

const QuizSettings = () => {
  const [open, setOpen] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const { quiz, setQuiz } = useEditorQuiz()
  const t = useTranslations('QuizSettings')

  const updateQuiz = (updates: Partial<typeof quiz>) => {
    setQuiz({ ...quiz, ...updates })
  }

  const updateThemeImage = (hash?: string, url?: string) => {
    setQuiz({
      ...quiz,
      theme: { ...quiz.theme, background: hash },
      images: hash && url ? { ...quiz.images, [hash]: url } : quiz.images
    })
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch('/api/editor/quiz/upload-image', {
        method: 'POST',
        body: formData
      })

      if (!res.ok) throw new Error('Upload failed')

      const { hash, url } = await res.json()
      if (hash && url) {
        updateThemeImage(hash, url)
      }
    } catch (err) {
      console.error('Theme background upload error:', err)
    } finally {
      setIsUploading(false)
    }
  }

  const backgroundUrl = quiz.theme.background ? quiz.images?.[quiz.theme.background] : null

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        Settings
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[425px] m-4">
        <DialogHeader title={t('title')} />
        
        <div className="flex flex-col gap-6 p-4">
          {/* Quiz Title */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium opacity-70">{t('quizTitleLabel')}</label>
            <TextInput 
              value={quiz.title} 
              onChange={(e) => updateQuiz({ title: e.target.value })} 
            />
          </div>

          {/* Theme Color */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium opacity-70">{t('themeColorLabel')}</label>
            <div className="flex gap-3 items-center">
              <input 
                type="color" 
                value={quiz.theme.color} 
                onChange={(e) => updateQuiz({ 
                  theme: { ...quiz.theme, color: e.target.value } 
                })}
                className="w-10 h-10 rounded-md cursor-pointer bg-transparent border-none p-0"
              />
              <TextInput 
                value={quiz.theme.color} 
                onChange={(e) => updateQuiz({ 
                  theme: { ...quiz.theme, color: e.target.value } 
                })}
                className="font-mono uppercase"
              />
            </div>
          </div>

          {/* Theme Background Image */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium opacity-70">{t('themeBackgroundLabel')}</label>
            <div className="relative w-full aspect-video bg-neutral-900 rounded-lg overflow-hidden border border-white/10 flex items-center justify-center">
              {isUploading ? (
                <Loader2 className="animate-spin text-white/50" />
              ) : backgroundUrl ? (
                <div className="relative w-full h-full group">
                  <img src={backgroundUrl} alt="Theme Background" className="object-cover w-full h-full" />
                  <button 
                    type="button"
                    onClick={() => updateThemeImage(undefined)}
                    className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-red-500 text-white rounded-full transition-all opacity-0 group-hover:opacity-100"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <ImageInput onChange={handleImageUpload} />
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default QuizSettings