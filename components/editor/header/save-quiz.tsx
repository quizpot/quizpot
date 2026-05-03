"use client"
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useEditorQuiz } from '../providers/editor-quiz-provider'
import FancyButton from '@/components/ui/fancy-button'
import { useToast } from '@/components/ui/toaster'

const SaveQuiz = () => {
  const router = useRouter()
  const toast = useToast()
  const { quiz, setQuiz, saved, setSaved } = useEditorQuiz()
  const [isSaving, setIsSaving] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const onSave = async () => {
    setIsSaving(true)
    const isNew = !quiz.id
    const quizId = quiz.id || crypto.randomUUID()
    
    try {
      const url = isNew ? '/api/editor/quiz/create' : '/api/editor/quiz/update'
      
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...quiz, id: quizId }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to save quiz')
      }

      const savedQuiz = { ...quiz, id: quizId }
      
      setQuiz(savedQuiz)
      setSaved(true)
      
      if (isNew) {
        router.push(`/editor?quizId=${quizId}`)
      }
    } catch (error) {
      toast("Error", { 
        description: error instanceof Error ? error.message : 'Something went wrong', 
        variant: 'error' 
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (!mounted) {
    return (
      <FancyButton disabled color="gray">
        Save
      </FancyButton>
    )
  }

  return (
    <FancyButton 
      onClick={onSave} 
      disabled={saved || isSaving}
      color={saved ? 'green' : isSaving ? 'yellow' : 'blue'}
    >
      {isSaving ? 'Saving...' : saved ? 'Saved' : 'Save'}
    </FancyButton>
  )
}

export default SaveQuiz