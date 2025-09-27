import { QuizFile } from "./QuizFile"

export const defaultQuiz: QuizFile = {
  version: 0,
  title: "Quiz Title",
  description: "This is a short description of the quiz.",
  language: "en",
  theme: {
    background: "#e5e5e5"
  },
  questions: [
    {
      questionType: 'multipleChoice',
      question: "What is the color of the sky?",
      timeLimit: 30,
      questionDisplayTime: 5,
      points: 'normalPoints',
      choices: [
        {
          text: "Red",
          correct: false
        },
        {
          text: "Blue",
          correct: true
        },
        {
          text: "Yellow",
          correct: false
        },
        {
          text: "Green",
          correct: false
        }
      ]
    }
  ],
  createdAt: new Date()
}