"use client"
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"
import FancyButton from "@/components/ui/fancy-button"
import TextAreaInput from "@/components/ui/textarea-input"
import { useState } from "react"

const AiEditor = () => {
  const [prompt, setPrompt] = useState('Generate more steps for the quiz ...')

  const submitPrompt = () => {
    console.log('submit prompt')
  }

  return (
    <Dialog>
      <DialogHeader title='AI Editor' />
      <DialogContent className="p-4 flex flex-col gap-4">
        <TextAreaInput value={ prompt } onChange={ (e) => { setPrompt(e.target.value) } } />
        <FancyButton color="green" onClick={ submitPrompt }>
          Submit
        </FancyButton>
      </DialogContent>
    </Dialog>
  )
}

export default AiEditor