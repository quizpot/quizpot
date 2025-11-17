import { QuizFile } from "@/lib/QuizFile"
import { sysPrompt } from "@/lib/SysPrompt"
import { GoogleGenAI } from "@google/genai"
import { NextRequest } from "next/server"

export async function POST(request: NextRequest) {
  const { prompt } = await request.json()

  if (!prompt) {
    return new Response(JSON.stringify({ error: 'Invalid prompt' }), { status: 400 })
  } else if (prompt.length < 15) {
    return new Response(JSON.stringify({ error: 'Prompt too short' }), { status: 400 })
  }

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_KEY })

  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash-001',
    config: {
      systemInstruction: sysPrompt(),
    },
    contents: prompt,
  })

  if (!response.text) {
    return new Response(JSON.stringify({ error: 'Error generating quiz, check console for details' }), { status: 500 })
  }

  const unparsedJson = response.text.replaceAll('```json', '').replaceAll('```', '')
  const quiz: QuizFile = JSON.parse(unparsedJson)
  const id = crypto.randomUUID()

  quiz.id = id

  return new Response(JSON.stringify({ quiz }), { status: 200 })
}