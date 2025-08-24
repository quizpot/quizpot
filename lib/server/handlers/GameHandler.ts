import { sendEvent } from "../managers/EventManager"
import { Answer, deleteLobby, getLobbyByPlayerId, Lobby, updatePlayerScore } from "../managers/LobbyManager"
import { getWSClientById } from "../managers/WSClientManager"
import { HandlerContext } from "./HandlerContext"
import { sanitizeQuestion } from "@/lib/misc/QuestionSanitizer"
import { validateAnswer } from "@/lib/misc/AnswerValidator"
import { calculateScore } from "@/lib/misc/ScoreCalculator"

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
  
  const payload = {
    status: 'question',
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

  sendEvent(host, 'lobbyStatusUpdate', {
    status: 'answer',
  })

  lobby.players.forEach(player => {
    sendEvent(player.client, 'lobbyStatusUpdate', {
      status: 'answer',
    })
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
    if (lobby.currentQuestionIndex === quiz.questions.length - 1) {
      handleEndState(lobby)
    } else {
      handleScoreState(lobby)
    }
  }, question.timeLimit * 1000)
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

  sendEvent(host, 'lobbyStatusUpdate', {
    status: 'score',
  })

  lobby.players.forEach(player => {
    sendEvent(player.client, 'lobbyStatusUpdate', {
      status: 'score',
    })
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

  sendEvent(host, 'lobbyStatusUpdate', {
    status: 'end',
  })

  lobby.players.forEach(player => {
    sendEvent(player.client, 'lobbyStatusUpdate', {
      status: 'end',
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
      error: 'No answer provided',
    })

    return
  }

  const lobby = getLobbyByPlayerId(client.id)

  if (!lobby) {
    sendEvent(client, 'submitAnswerError', {
      error: 'No lobby found',
    })

    return
  }

  const question = lobby.quiz.questions[lobby.currentQuestionIndex]

  if (!question) {
    sendEvent(client, 'submitAnswerError', {
      error: 'No question found',
    })

    return
  }

  if (!lobby.answerTimestamp) {
    sendEvent(client, 'submitAnswerError', {
      error: 'No answer timestamp',
    })

    return
  }

  if (!lobby.answerTimeout) {
    sendEvent(client, 'submitAnswerError', {
      error: 'No answer timeout',
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
    if (lobby.currentQuestionIndex === lobby.quiz.questions.length - 1) {
      handleEndState(lobby)
    } else {
      handleScoreState(lobby)
    }
  }
}
