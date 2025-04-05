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

export type Question = MultipleChoiceQuestion | TrueFalseQuestion

// export type Question = {
//   type: MultipleChoiceQuestion | TrueFalseQuestion
//   timeLimit: number
//   points: "normalPoints" | "doublePoints" | "noPoints"
// }

export type MultipleChoiceQuestion = {
  questionType: "multipleChoice"
  question: string
  image?: string
  choices: Choice[]
  timeLimit: number
  points: "normalPoints" | "doublePoints" | "noPoints"
}

export type TrueFalseQuestion = {
  questionType: "trueFalse"
  question: string
  image?: string
  answer: boolean
  timeLimit: number
  points: "normalPoints" | "doublePoints" | "noPoints"
}

export type Choice = {
  text: string
  correct: boolean
}