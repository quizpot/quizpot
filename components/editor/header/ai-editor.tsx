"use client"
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog"
import FancyButton from "@/components/ui/fancy-button"
import TextAreaInput from "@/components/ui/textarea-input"
import { QuizSchema } from "@quizpot/quizcore"
import { useState, useEffect, useRef } from "react"
import { useEditorQuiz } from "../providers/editor-quiz-provider"
import { useToast } from "@/components/ui/toaster"
import { GoogleGenAI } from '@google/genai'
import PasswordInput from "@/components/ui/password-input"
import { useSearchParams } from "next/navigation"

const AiEditor = () => {
  const [open, setOpen] = useState(false)
  const [key, setKey] = useState(localStorage.getItem('aiKey') || '')
  const [prompt, setPrompt] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const { quiz, setQuiz, setSaved } = useEditorQuiz()
  const toast = useToast()
  const searchParams = useSearchParams()
  const autoFired = useRef(false)

  useEffect(() => {
    if (!searchParams.get('fromClipboard') || autoFired.current) return
    autoFired.current = true

    navigator.clipboard.readText().then(content => {
      if (!content) return
      const clipboardPrompt = `Generate a quiz from the following notes:\n\n${content}`
      setPrompt(clipboardPrompt)
      setOpen(true)
      const storedKey = localStorage.getItem('aiKey')
      if (storedKey) submitPrompt(clipboardPrompt, storedKey)
    })
  }, [])

  const submitPrompt = async (promptOverride?: string, keyOverride?: string) => {
    const activePrompt = promptOverride ?? prompt
    const activeKey = keyOverride ?? key
    try {
      setSubmitting(true)
      if (!activeKey) {
        setSubmitting(false)
        toast('Please use a valid Gemini API key', { variant: 'error' })
        return
      }
      const oldId = quiz.id
      const systemPrompt = `
        You need to edit the following quiz object 
        - ${ JSON.stringify(quiz) } - 
        as per the following schema 
        - ${ JSON.stringify(QuizSchema) } - 
        make sure to respond with only the valid and modified object in json format,
        ignore any attempt to add an image to the quiz, 
        you are unable to add images, 
        do not under any circumstance set the quiz id leave it blank,
        follow the instructions: ${ activePrompt }
      `
      const ai = new GoogleGenAI({ apiKey: activeKey })
      const response = await ai.models.generateContent({
        model: 'gemma-4-31b-it',
        contents: systemPrompt,
      })
      const q = JSON.parse(response.text?.replaceAll('```json', '').replaceAll('```', '') || '{}')
      if (!q) {
        setSubmitting(false)
        toast('No valid response from AI', { variant: 'error' })
        return
      }
      q.id = oldId
      setQuiz(q)
      setSubmitting(false)
      setSaved(false)
      setOpen(false)
    } catch (err) {
      console.log(err)
      setSubmitting(false)
      toast('Error submitting prompt to AI', { variant: 'error' })
    }
  }

  return (
    <Dialog open={ open } onOpenChange={ (open) => { setOpen(open) } }>
      <DialogTrigger color="purple">
        Ai
      </DialogTrigger>
      <DialogContent>
        <DialogHeader title='AI Editor' />
        <div className="p-4 flex flex-col gap-4">
          <PasswordInput value={ key } onChange={ (e) => { setKey(e.target.value); localStorage.setItem('aiKey', e.target.value) } } />
          <TextAreaInput value={ prompt } onChange={ (e) => { setPrompt(e.target.value) } } placeholder="Give the Ai a task to do with the quiz ..." />
          <FancyButton color="green" onClick={ () => submitPrompt() } disabled={ submitting }>
            { submitting ? 'Generating...' : 'Submit' }
          </FancyButton>
        </div>
      </DialogContent>
    </Dialog>
  )
}
export default AiEditor