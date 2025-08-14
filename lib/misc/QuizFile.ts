export type QuizFile = {
  version: number
  title: string
  description: string
  theme: QuizTheme 
  thumbnail?: string
  language: string
  questions: Question[]
}

export type QuizTheme = {
  background: string
  color1: string
  color2: string
  color3: string
  color4: string
  color5: string
  color6: string
}

export type Question = MultipleChoiceQuestion | TrueFalseQuestion | ShortAnswerQuestion

export type MultipleChoiceQuestion = {
  questionType: "multipleChoice"
  question: string
  image?: string
  choices: Choice[]
  questionDisplayTime: number
  timeLimit: number
  points: "normalPoints" | "doublePoints" | "noPoints"
}

export type Choice = {
  text: string
  correct: boolean
}

export type MultipleChoiceAnswer = {
  choiceIndex: number
}

export type TrueFalseQuestion = {
  questionType: "trueFalse"
  question: string
  image?: string
  answer: boolean
  questionDisplayTime: number
  timeLimit: number
  points: "normalPoints" | "doublePoints" | "noPoints"
}

export type TrueFalseAnswer = {
  answer: boolean
}

export type ShortAnswerQuestion = {
  questionType: "shortAnswer"
  question: string
  image?: string
  answer: string
  questionDisplayTime: number
  timeLimit: number
}

export type ShortAnswerAnswer = {
  answer: string
}