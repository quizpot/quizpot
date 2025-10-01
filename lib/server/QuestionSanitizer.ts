/* eslint-disable @typescript-eslint/no-unused-vars */
import { Choice, MultipleChoiceQuestion, Question, ShortAnswerQuestion, TrueFalseQuestion } from "../misc/QuizFile"

export const sanitizeQuestion = (question: Question): SanitizedQuestion | Error => {
  if (question.questionType === 'multipleChoice') {
    const sanitizedQuestion = {
      ...question,
      choices: question.choices.map(choice => {
        const { correct, ...sanitizedChoice } = choice
        return sanitizedChoice
      })
    }

    return sanitizedQuestion
  }

  if (question.questionType === 'trueFalse') {
    const { answer, ...sanitizedQuestion } = question
    
    return sanitizedQuestion
  }

  if (question.questionType === 'shortAnswer') {
    const { answers, ...sanitizedQuestion } = question
    
    return sanitizedQuestion
  }

  return new Error("Couldn't handle question type")
}

export type SanitizedQuestion = SanitizedMultipleChoiceQuestion | SanitizedTrueFalseQuestion | SanitizedShortAnswerQuestion

export type SanitizedMultipleChoiceQuestion = Omit<MultipleChoiceQuestion, 'choices'> & {
  choices: Omit<Choice, 'correct'>[]
}

export type SanitizedTrueFalseQuestion = Omit<TrueFalseQuestion, 'answer'>

export type SanitizedShortAnswerQuestion = Omit<ShortAnswerQuestion, 'answers'>