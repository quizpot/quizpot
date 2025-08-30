import { sendEvent } from "../managers/EventManager"
import { Answer, deleteLobby, getLobbyByPlayerId, Lobby, updateLobbyStatus, updatePlayerScore } from "../managers/LobbyManager"
import { HandlerContext } from "./HandlerContext"
import { validateAnswer } from "@/lib/misc/AnswerValidator"
import { calculateScore } from "@/lib/misc/ScoreCalculator"
import { LobbyStatus } from "@/lib/misc/LobbyStatus"

export function startGame(lobby: Lobby) {
  handleDisplayQuestionState(lobby)
}

function handleDisplayQuestionState(lobby: Lobby) {
  const status = updateLobbyStatus(lobby.code, LobbyStatus.question)

  if (status instanceof Error) {
    deleteLobby(lobby.host, status.message)
    return
  }

  const quiz = lobby.quiz
  const question = quiz.questions[lobby.currentQuestionIndex]

  setTimeout(() => {
    handleQuestionAnswerState(lobby)
  }, question.questionDisplayTime * 1000)
}

function handleQuestionAnswerState(lobby: Lobby) {
  if (lobby.answerTimeout) clearTimeout(lobby.answerTimeout)
  lobby.answers = []
  lobby.answerTimestamp = Date.now()

  const quiz = lobby.quiz
  const question = quiz.questions[lobby.currentQuestionIndex]

  lobby.answerTimeout = setTimeout(() => {
    handleAnswersState(lobby)
  }, question.timeLimit * 1000)

  const status = updateLobbyStatus(lobby.code, LobbyStatus.answer)

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

  setTimeout(() => {
    if (lobby.currentQuestionIndex === lobby.quiz.questions.length - 1) {
      handleEndState(lobby)
    } else {
      handleScoreState(lobby)
    }
  }, lobby.quiz.answersTimeout * 1000)
}

function handleScoreState(lobby: Lobby) {
  if (lobby.status !== LobbyStatus.answers) return

  const status = updateLobbyStatus(lobby.code, LobbyStatus.score)

  if (status instanceof Error) {
    deleteLobby(lobby.host, status.message)
    return
  }

  // Calculate score and update it
  // TODO: Optimize these
  lobby.answers.forEach((answer) => {
    lobby.players.forEach((p) => {
      if (p.client.id === answer.playerId) {
        updatePlayerScore(lobby.code, answer.playerId, calculateScore(p.score, p.streak, lobby.quiz.questions[lobby.currentQuestionIndex], answer))
      }
    })
  })

  setTimeout(() => {
    lobby.currentQuestionIndex = lobby.currentQuestionIndex + 1

    handleDisplayQuestionState(lobby)
  }, lobby.quiz.scoreTimeout * 1000)
}

function handleEndState(lobby: Lobby) {
  if (lobby.status !== LobbyStatus.answers) return

  const status = updateLobbyStatus(lobby.code, LobbyStatus.end)

  if (status instanceof Error) {
    deleteLobby(lobby.host, status.message)
    return
  }

  // Calculate score and update it
  // TODO: Optimize these
  lobby.answers.forEach((answer) => {
    lobby.players.forEach((p) => {
      if (p.client.id === answer.playerId) {
        updatePlayerScore(lobby.code, answer.playerId, calculateScore(p.score, p.streak, lobby.quiz.questions[lobby.currentQuestionIndex], answer))
      }
    })
  })

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

  lobby.answers.push(answerObj)

  if (lobby.answers.length === lobby.players.length) {
    clearTimeout(lobby.answerTimeout)
    handleAnswersState(lobby)
  }
}
