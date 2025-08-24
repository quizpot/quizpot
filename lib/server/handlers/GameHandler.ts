import { sendEvent } from "../managers/EventManager"
import { Answer, deleteLobby, getLobbyByPlayerId, Lobby, updatePlayerScore } from "../managers/LobbyManager"
import { getWSClientById } from "../managers/WSClientManager"
import { HandlerContext } from "./HandlerContext"
import { sanitizeQuestion } from "@/lib/misc/QuestionSanitizer"
import { validateAnswer } from "@/lib/misc/AnswerValidator"
import { calculateScore } from "@/lib/misc/ScoreCalculator"
import { LobbyStatus } from "@/lib/misc/LobbyStatus"
import { LobbyStatusUpdatePayload } from "../ServerEvents"

export function startGame(lobby: Lobby) {
  handleDisplayQuestionState(lobby)
}

function handleDisplayQuestionState(lobby: Lobby) {
  const host = getWSClientById(lobby.host.id)

  if (!host) {
    deleteLobby(lobby.host)
    return
  }

  const quiz = lobby.quiz
  const question = quiz.questions[lobby.currentQuestionIndex]
  const sanitizedQuestion = sanitizeQuestion(question)

  if (sanitizedQuestion instanceof Error) {
    deleteLobby(lobby.host)
    return
  }
  
  const payload = {
    status: LobbyStatus.question,
    sanitizedQuestion: sanitizedQuestion,
  }

  sendEvent(host, 'lobbyStatusUpdate', payload)

  lobby.players.forEach(player => {
    sendEvent(player.client, 'lobbyStatusUpdate', payload)
  })

  setTimeout(() => {
    handleQuestionAnswerState(lobby)
  }, question.questionDisplayTime * 1000)
}

function handleQuestionAnswerState(lobby: Lobby) {
  const host = getWSClientById(lobby.host.id)

  if (!host) {
    deleteLobby(lobby.host)
    return
  }

  lobby.answers = []

  const payload: LobbyStatusUpdatePayload = {
    status: LobbyStatus.answer
  }

  sendEvent(host, 'lobbyStatusUpdate', payload)

  lobby.players.forEach(player => {
    sendEvent(player.client, 'lobbyStatusUpdate', payload)
  })

  const quiz = lobby.quiz
  const question = quiz.questions[lobby.currentQuestionIndex]

  if (lobby.answerTimeout) clearTimeout(lobby.answerTimeout)

  lobby.answerTimeout = null
  lobby.answerTimestamp = null

  const curQuestion = lobby.currentQuestionIndex

  lobby.answerTimestamp = Date.now()
  lobby.answerTimeout = setTimeout(() => {
    if (curQuestion !== lobby.currentQuestionIndex) return
    handleAnswersState(lobby)
  }, question.timeLimit * 1000)
}

function handleAnswersState(lobby: Lobby) {
  const host = getWSClientById(lobby.host.id)

  if (!host) {
    deleteLobby(lobby.host)
    return
  }

  const payload: LobbyStatusUpdatePayload = {
    status: LobbyStatus.answers
  }

  sendEvent(host, 'lobbyStatusUpdate', payload)

  lobby.players.forEach(player => {
    sendEvent(player.client, 'lobbyStatusUpdate', payload)
  })

  setTimeout(() => {
    if (lobby.currentQuestionIndex === lobby.quiz.questions.length - 1) {
      handleEndState(lobby)
    } else {
      handleScoreState(lobby)
    }
  }, lobby.quiz.scoreTimeout * 1000)
}

function handleScoreState(lobby: Lobby) {
  const host = getWSClientById(lobby.host.id)

  if (!host) {
    deleteLobby(lobby.host)
    return
  }

  // TODO: Optimize these
  lobby.answers.forEach((answer) => {
    lobby.players.forEach((p) => {
      if (p.client.id === answer.playerId) {
        updatePlayerScore(lobby.code, answer.playerId, calculateScore(p.score, p.streak, lobby.quiz.questions[lobby.currentQuestionIndex], answer))
      }
    })
  })

  const payload: LobbyStatusUpdatePayload = {
    status: LobbyStatus.score
  }

  sendEvent(host, 'lobbyStatusUpdate', payload)

  lobby.players.forEach(player => {
    sendEvent(player.client, 'lobbyStatusUpdate', payload)
  })

  setTimeout(() => {
    lobby.currentQuestionIndex = lobby.currentQuestionIndex + 1

    handleDisplayQuestionState(lobby)
  }, lobby.quiz.scoreTimeout * 1000)
}

function handleEndState(lobby: Lobby) {
  const host = getWSClientById(lobby.host.id)

  if (!host) {
    deleteLobby(lobby.host)
    return
  }

  lobby.answers.forEach((answer) => {
    lobby.players.forEach((p) => {
      if (p.client.id === answer.playerId) {
        updatePlayerScore(lobby.code, answer.playerId, calculateScore(p.score, p.streak, lobby.quiz.questions[lobby.currentQuestionIndex], answer))
      }
    })
  })

  const payload: LobbyStatusUpdatePayload = {
    status: LobbyStatus.end
  }

  sendEvent(host, 'lobbyStatusUpdate', payload)

  lobby.players.forEach(player => {
    sendEvent(player.client, 'lobbyStatusUpdate', payload)
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
