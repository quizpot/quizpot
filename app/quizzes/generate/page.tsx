"use client"
import Header from '@/components/home/Header'
import Button from '@/components/ui/ButtonOld'
import PasswordInput from '@/components/ui/PasswordInput'
import TextAreaInput from '@/components/ui/TextAreaInput'
import { useToast } from '@/components/ui/Toaster'
import { saveQuiz } from '@/lib/client/IndexedDB'
import { GoogleGenAI } from '@google/genai'
import Link from 'next/link'
import React, { useState } from 'react'

const GenerateQuizPage = () => {
  const toast = useToast()
  const [geminiApiKey, setGeminiApiKey] = useState(process.env.NEXT_PUBLIC_GEMINI_KEY ? process.env.NEXT_PUBLIC_GEMINI_KEY : '')
  const [prompt, setPrompt] = useState('Generate me a quiz about dogs and cats with a title slide and 10 questions')
  const [generating, setGenerating] = useState(false)

  const onGenerate = async () => {
    if (!geminiApiKey || geminiApiKey.length <= 2) {
      toast('Invalid Gemini API key', { variant: 'error' })
      return
    }

    if (!prompt || prompt.length <= 15) {
      toast('Invalid prompt, use atleast 15 characters', { variant: 'error' })
      return
    }

    setGenerating(true)
    
    try {
      const ai = new GoogleGenAI({apiKey: geminiApiKey})
      const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash-001',
        config: {
          systemInstruction: systemPrompt,
        },
        contents: prompt,
      })

      if (!response.text) {
        setGenerating(false)
        toast('Error generating quiz, check console for details', { variant: 'error' })
        return
      }

      console.log(response.text)
      const unparsedJson = response.text.replaceAll('```json', '').replaceAll('```', '')
      const quiz = JSON.parse(unparsedJson)
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
        <div className='flex flex-col items-center justify-center gap-4 p-4 max-w-md w-full'>
          <h1 className='text-4xl font-semibold w-full text-center'>Generating...</h1>
          <p>You will be redirected to the editor shortly.</p>
        </div>
      </section>
    )
  }

  return (
    <>
      <Header />
      <section className='min-h-screen w-full flex flex-col items-center justify-center'>
        <div className='flex flex-col items-center justify-center gap-4 p-4 max-w-md w-full'>
          <h1 className='text-4xl font-semibold w-full text-center'>Generate Quiz</h1>
          <p>Get your Gemini key for free from <Link href={'https://aistudio.google.com'} className='underline' target='_blank'>here</Link></p>
          <div className='flex flex-col gap-2 w-full'>
            <h1>Gemini API Key:</h1>
            <PasswordInput onChange={ (e) => { setGeminiApiKey(e.target.value) } } value={ geminiApiKey } className='w-full' />
          </div>
          <div className='flex flex-col gap-2 w-full'>
            <h1>Prompt:</h1>
            <TextAreaInput onChange={ (e) => { setPrompt(e.target.value) } } value={ prompt } className='w-full' />
          </div>
          <Button onClick={ onGenerate } variant='green' className='w-full font-semibold'>
            Generate
          </Button>
        </div>
      </section>
    </>
  )
}

export default GenerateQuizPage


const systemPrompt = `
You can only output a valid json object, 
nothing else and your task is to generate a json object that represents a quiz according to the following typescript definition. 
Ignore any kind of image values you are not able to generate that. 
Current date is '${ new Date() }' use it as the createdAt value in the quiz file. 
Here's the typescript definition of a quiz file object:

export type QuizFile = {
  version: number
  title: string
  description: string
  theme: QuizTheme 
  thumbnail?: string
  language: string
  questions: Question[]
  createdAt: Date
}

export type QuizTheme = {
  background: string
}

export type Question = MultipleChoiceQuestion | TrueFalseQuestion | SlideQuestion
export type QuestionType = Question['questionType']
export type QuestionPoints = "normalPoints" | "doublePoints" | "noPoints"

export type MultipleChoiceQuestion = {
  questionType: "multipleChoice"
  question: string
  image?: string
  choices: Choice[]
  questionDisplayTime: number
  timeLimit: number
  points: QuestionPoints
}

export type Choice = {
  text: string
  correct: boolean
}

export type MultipleChoiceAnswer = {
  answerType: "multipleChoice"
  choiceIndex: number
}

export type TrueFalseQuestion = {
  questionType: "trueFalse"
  question: string
  image?: string
  answer: boolean
  questionDisplayTime: number
  timeLimit: number
  points: QuestionPoints
}

export type TrueFalseAnswer = {
  answerType: "trueFalse"
  answer: boolean
}

export type ShortAnswerQuestion = {
  questionType: "shortAnswer"
  question: string
  image?: string
  answers: string[]
  questionDisplayTime: number
  timeLimit: number
  points: QuestionPoints
}

export type ShortAnswerAnswer = {
  answerType: "shortAnswer"
  answer: string
}

// Slides Feature
export type SlideQuestion = {
  questionType: "slide"
  layout: SlideLayout
}

export type SlideLayout = TitleSlideLayout | TitleAndTextSlideLayout
export type SlideType = SlideLayout['slideType']

export type TitleSlideLayout = {
  slideType: "title"
  title: string
  subtitle?: string
}

export type TitleImageTextSlideLayout = {
  slideType: "titleImageText"
  title: string
  image?: string
  text: string
}

`