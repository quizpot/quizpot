import { MultipleChoiceAnswer, Question, ShortAnswerAnswer, TrueFalseAnswer } from "../QuizFile"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const validateAnswer = (answer: any, question: Question): boolean => {
  if (question.questionType === 'multipleChoice') {
    const typedAnswer = answer as MultipleChoiceAnswer
  
    if (question.choices.at(typedAnswer.choiceIndex)?.correct) {
      return true
    }
  }

  if (question.questionType === 'trueFalse') {
    const typedAnswer = answer as TrueFalseAnswer

    if (question.answer === typedAnswer.answer) {
      return true
    }
  }

  if (question.questionType === 'shortAnswer') {
    const typedAnswer = answer as ShortAnswerAnswer
    const lowercasedAnswers = question.answers.map(ans => ans.toLowerCase())

    if (lowercasedAnswers.includes(typedAnswer.answer.trimEnd().toLowerCase())) {
      return true
    }
  }

  return false
}