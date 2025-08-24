import { Answer } from "../server/managers/LobbyManager"
import { Question } from "./QuizFile"

const BASE_SCORE = 500
const TIME_BONUS_MAX = 500

/**
 * Calculates a player's score with modifiers
 * @param {number} currentScore - The player's score before this question.
 * @param {number} streak - The player's current correct answer streak.
 * @param {Question} question - The question object.
 * @param {Answer} answer - The player's submitted answer object.
 * @returns {number} The player's new score after this question.
 */
export const calculateScore = (currentScore: number, streak: number, question: Question, answer: Answer): number => {
  if (!answer.isCorrect) return currentScore

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

  let timeBonus = 0
  if (question.timeLimit > 0) {
    const timeTakenRatio = answer.timeTaken / question.timeLimit
    timeBonus = TIME_BONUS_MAX * (1 - timeTakenRatio)
    if (timeBonus < 0) {
      timeBonus = 0
    }
  }

  let questionScore = (BASE_SCORE + timeBonus) * multiplier

  if (streak >= 2) {
    // A streak of 2 gives a 10% bonus, 3 gives 20%, etc. Capped at 50% for a streak of 5+.
    const streakBonusMultiplier = Math.min(1 + (streak - 1) * 0.1, 1.5)
    questionScore *= streakBonusMultiplier
  }

  return currentScore + questionScore
}