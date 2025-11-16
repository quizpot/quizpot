"use client"
import Footer from '@/components/nav/Footer'
import Header from '@/components/nav/Header'
import FancyButton from '@/components/ui/fancy-button'
import FancyCard from '@/components/ui/fancy-card'
import TextAreaInput from '@/components/ui/textarea-input'
import { useToast } from '@/components/ui/Toaster'
import { saveQuiz } from '@/lib/client/IndexedDB'
import { useTranslations } from 'next-intl'
import React, { useState } from 'react'

const GenerateQuizPage = () => {
  const t = useTranslations('GenerateQuizPage')
  const toast = useToast()
  const [prompt, setPrompt] = useState(t('prompt'))
  const [generating, setGenerating] = useState(false)

  const onGenerate = async () => {
    if (!prompt || prompt.length <= 15) {
      toast('Invalid prompt, use atleast 15 characters', { variant: 'error' })
      return
    }

    setGenerating(true)
    
    try {
      const res = await fetch('/api/quizzes/generate/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      })
      
      const json = await res.json()
      const quiz = json.quiz
      const id = crypto.randomUUID()

      await saveQuiz(quiz, id)
      window.location.href = '/editor/' + id
    } catch (e) {
      setGenerating(false)
      toast('Error generating quiz, check console for details', { variant: 'error' })
      console.error(e)
    }
  }

  if (generating) {
    return (
      <section className='min-h-screen w-full flex flex-col items-center justify-center'>
        <FancyCard className='flex flex-col items-center justify-center gap-4 p-4 max-w-md w-full'>
          <h1 className='text-4xl font-semibold w-full text-center'>{ t('generating') }</h1>
          <p>{ t('description') }</p>
        </FancyCard>
      </section>
    )
  }

  return (
    <>
      <Header />
      <section className='min-h-screen w-full flex flex-col items-center justify-center p-4'>
        <FancyCard className='flex flex-col items-center justify-center gap-4 p-4 max-w-md w-full'>
          <h1 className='text-2xl font-semibold w-full text-center'>{ t('title') }</h1>
          <TextAreaInput onChange={ (e) => { setPrompt(e.target.value) } } value={ prompt } className='w-full' />
          <FancyButton onClick={ onGenerate } color='green' className='w-full'>
            { t('generate') }
          </FancyButton>
        </FancyCard>
        <Footer />
      </section>
    </>
  )
}

export default GenerateQuizPage