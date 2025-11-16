import { QuizFile } from "../QuizFile"

export const currentVersion: number = 1

export const migrate = (quiz: QuizFile): QuizFile => {
  if (quiz.version === currentVersion) {
    return quiz
  }

  if (quiz.version < 1) {
    quiz.version = 0
  }

  if (quiz.version == 0) {
    quiz = addId(quiz)
    quiz.version = 1
  }

  quiz.version = 2

  return quiz
}

const addId = (quiz: QuizFile): QuizFile => {
  quiz.id = crypto.randomUUID()
  return quiz
}