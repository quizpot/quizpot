import { sendEvent } from "../managers/EventManager"
import { Answer, deleteLobby, getLobbyByHostId, getLobbyByPlayerId, Lobby, resetLobbyAnswers, updateLobbyAnswers, updateLobbyStatus, updatePlayerScore } from "../managers/LobbyManager"
import { HandlerContext } from "./HandlerContext"
import { validateAnswer } from "../AnswerValidator"
import { calculateScore } from "@/lib/server/ScoreCalculator"
import { LobbyStatus } from "@/lib/misc/LobbyStatus"
import { getWSClientById } from "../managers/WSClientManager"

export function startGame(lobby: Lobby) {
  handleNextQuestionState(lobby)
}

function handleNextQuestionState(lobby: Lobby) {
  const quiz = lobby.quiz
  const question = quiz.questions[lobby.currentQuestionIndex]

  if (question.questionType === 'slide') {
    handleSlideState(lobby)
  } else {
    handleDisplayQuestionState(lobby) 
  }
}

function handleDisplayQuestionState(lobby: Lobby) {
  const quiz = lobby.quiz
  const question = quiz.questions[lobby.currentQuestionIndex]

  if (question.questionType === 'slide') {
    handleSlideState(lobby)
    return
  }

  const timeout = question.questionDisplayTime * 1000
  const status = updateLobbyStatus(lobby.code, LobbyStatus.question, timeout)

  if (status instanceof Error) {
    deleteLobby(lobby.host, status.message)
    return
  }

  setTimeout(() => {
    handleQuestionAnswerState(lobby)
  }, timeout)
}

function handleSlideState(lobby: Lobby) {
  const status = updateLobbyStatus(lobby.code, LobbyStatus.slide)

  if (status instanceof Error) {
    deleteLobby(lobby.host, status.message)
    return
  }
}

function handleQuestionAnswerState(lobby: Lobby) {
  if (lobby.answerTimeout) clearTimeout(lobby.answerTimeout)
  // Reset answers and invalidate player answers
  resetLobbyAnswers(lobby.code)
  lobby.answerTimestamp = Date.now()

  const quiz = lobby.quiz
  const question = quiz.questions[lobby.currentQuestionIndex]

  if (question.questionType === 'slide') {
    handleSlideState(lobby)
    return
  }

  const timeout = question.timeLimit * 1000

  lobby.answerTimeout = setTimeout(() => {
    handleAnswersState(lobby)
  }, timeout)

  const status = updateLobbyStatus(lobby.code, LobbyStatus.answer, timeout)

  if (status instanceof Error) {
    clearTimeout(lobby.answerTimeout)
    deleteLobby(lobby.host, status.message)
    return
  }
}

function handleAnswersState(lobby: Lobby) {
  if (lobby.status !== LobbyStatus.answer) return

  const status = updateLobbyStatus(lobby.code, LobbyStatus.answers)

  if (status instanceof Error) {
    deleteLobby(lobby.host, status.message)
    return
  }

  lobby.answers.forEach((answer) => {
    const player = getWSClientById(answer.playerId)

    if (!player) return

    sendEvent(player, 'correctAnswerUpdate', { correctAnswer: answer.isCorrect })
  })
}

function handleScoreState(lobby: Lobby) {
  if (lobby.status !== LobbyStatus.answers) return

  // Calculate score and update it
  // TODO: Optimize these
  lobby.answers.forEach((answer) => {
    const p = lobby.players.find(player => player.client.id === answer.playerId)

    if (!p) return

    updatePlayerScore(lobby.code, answer.playerId, calculateScore(p.score, p.streak, lobby.quiz.questions[lobby.currentQuestionIndex], answer, lobby.quiz))
  })

  const status = updateLobbyStatus(lobby.code, LobbyStatus.score)

  if (status instanceof Error) {
    deleteLobby(lobby.host, status.message)
    return
  }
}

function handleEndState(lobby: Lobby) {
  if (lobby.status !== LobbyStatus.answers) return
  // Calculate score and update it
  // TODO: Optimize these
  lobby.answers.forEach((answer) => {
    const p = lobby.players.find(player => player.client.id === answer.playerId)

    if (!p) return

    updatePlayerScore(lobby.code, answer.playerId, calculateScore(p.score, p.streak, lobby.quiz.questions[lobby.currentQuestionIndex], answer, lobby.quiz))
  })

  const status = updateLobbyStatus(lobby.code, LobbyStatus.end)

  if (status instanceof Error) {
    deleteLobby(lobby.host, status.message)
    return
  }

  setTimeout(() => {
    deleteLobby(lobby.host, 'Lobby ended')
  }, 3000)
}

export function handleQuestionAnswer({ client, ctx }: HandlerContext) {
  const { answer } = ctx

  if (!answer) {
    sendEvent(client, 'submitAnswerError', {
      message: 'No answer provided',
    })

    return
  }

  const lobby = getLobbyByPlayerId(client.id)

  if (!lobby) {
    sendEvent(client, 'submitAnswerError', {
      message: 'No lobby found',
    })

    return
  }

  if (lobby.status !== LobbyStatus.answer) {
    sendEvent(client, 'submitAnswerError', {
      message: 'Lobby is not in answer state',
    })

    return
  }

  const question = lobby.quiz.questions[lobby.currentQuestionIndex]

  if (!question) {
    sendEvent(client, 'submitAnswerError', {
      message: 'No question found',
    })

    return
  }

  if (!lobby.answerTimestamp) {
    sendEvent(client, 'submitAnswerError', {
      message: 'No answer timestamp',
    })

    return
  }

  if (!lobby.answerTimeout) {
    sendEvent(client, 'submitAnswerError', {
      message: 'No answer timeout',
    })

    return
  }

  const correct = validateAnswer(answer, question)

  const answerObj: Answer = {
    playerId: client.id,
    answer,
    isCorrect: correct,
    timeTaken: Date.now() - lobby.answerTimestamp
  }

  // TODO: Optimize these
  if (correct) {
    lobby.players.forEach(p => {
      if (p.client.id === answerObj.playerId) {
        p.streak = p.streak + 1
      }
    })
  } else {
    lobby.players.forEach(p => {
      if (p.client.id === answerObj.playerId) {
        p.streak = 0
      }
    })
  }

  updateLobbyAnswers(lobby.code, answerObj)

  if (lobby.answers.length === lobby.players.length) {
    clearTimeout(lobby.answerTimeout)
    handleAnswersState(lobby)
  }
}

export const handleNextQuestion = ({ client }: HandlerContext) => {
  const lobby = getLobbyByHostId(client.id)

  if (!lobby) {
    sendEvent(client, 'nextQuestionError', {
      message: 'No lobby found',
    })

    return
  }

  const skippableStates = [
    LobbyStatus.slide, 
    LobbyStatus.answers,
    LobbyStatus.score
  ]

  if (!skippableStates.includes(lobby.status)) {
    sendEvent(client, 'nextQuestionError', {
      message: 'Unable to skip in this state',
    })

    return
  }

  switch (lobby.status) {
    case LobbyStatus.answers:
      if (lobby.currentQuestionIndex === lobby.quiz.questions.length - 1) {
        handleEndState(lobby)
      } else {
        handleScoreState(lobby)
      }
      break
    case LobbyStatus.slide:
    case LobbyStatus.score:
      lobby.currentQuestionIndex = lobby.currentQuestionIndex + 1

      handleNextQuestionState(lobby)
      break
  }
}