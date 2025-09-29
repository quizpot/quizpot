import { Answer } from "./managers/LobbyManager"
import { Question, QuizFile } from "../misc/QuizFile" // Assuming Quiz type is available

const BASE_SCORE = 500
const TIME_BONUS_MAX = 500

/**
 * Calculates a player's score with modifiers
 * @param {number} currentScore - The player's score before this question.
 * @param {number} streak - The player's current correct answer streak.
 * @param {Question} question - The question object.
 * @param {Answer} answer - The player's submitted answer object.
 * @param {Quiz} quiz - The full quiz object, for context (e.g., question count).
 * @returns {number} The player's new score after this question.
 */
export const calculateScore = (currentScore: number, streak: number, question: Question, answer: Answer, quiz: QuizFile): number => {
  if (!answer.isCorrect) return currentScore
  if (question.questionType === 'slide') return currentScore

  let multiplier = 1

  switch (question.points) {
    case 'doublePoints':
      multiplier = 2
      break
    case 'noPoints':
      multiplier = 0
      break
    case 'normalPoints':
    default:
      multiplier = 1
      break
  }

  if (multiplier === 0) return currentScore

  let timeBonus = 0

  if (question.timeLimit > 0) {
    const timeLimitMs = question.timeLimit * 1000
    const effectiveTimeTaken = Math.min(answer.timeTaken, timeLimitMs) 
    const timeRemainingRatio = 1 - (effectiveTimeTaken / timeLimitMs)
    timeBonus = TIME_BONUS_MAX * timeRemainingRatio
  }

  let questionScore = (BASE_SCORE + timeBonus) * multiplier

  if (streak >= 2) {
    const totalQuestions = quiz.questions.length
    const dynamicCap = Math.min(1.2 + Math.max(0, totalQuestions - 5) * 0.02, 1.5)
    const streakBonusMultiplier = Math.min(1 + (streak - 1) * 0.05, dynamicCap)
    
    questionScore *= streakBonusMultiplier
  }

  return currentScore + Math.trunc(questionScore)
}