import { sendEvent } from "../managers/EventManager"
import { deleteLobby, getLobbyByPlayerId, getPlayerScore, Lobby, updatePlayerScore, updateQuestionIndex } from "../managers/LobbyManager"
import { getWSClientById } from "../managers/WSClientManager"
import { MultipleChoiceQuestion } from "../../misc/QuizFile"
import { HandlerContext } from "./HandlerContext"
import { sanitizeQuestion } from "@/lib/misc/QuestionSanitizer"

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

  sendEvent(host, 'lobbyStateUpdate', {
    state: 'question',
    sanitizedQuestion: sanitizedQuestion,
  })

  lobby.players.forEach(player => {
    sendEvent(player.client, 'lobbyStateUpdate', {
      state: 'question',
      sanitizedQuestion: sanitizedQuestion,
    })
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

  sendEvent(host, 'lobbyStateUpdate', {
    state: 'answer',
  })

  lobby.players.forEach(player => {
    sendEvent(player.client, 'lobbyStateUpdate', {
      state: 'answer',
    })
  })

  const quiz = lobby.quiz
  const question = quiz.questions[lobby.currentQuestionIndex]

  // const timeout = 
  setTimeout(() => {
    if (lobby.currentQuestionIndex === quiz.questions.length - 1) {
      handleEndState(lobby)
    } else {
      handleScoreState(lobby)
    }
  }, question.timeLimit * 1000)

  //Clear timeout when everyone answered
  //clearTimeout(timeout)
}

function handleScoreState(lobby: Lobby) {
  const host = getWSClientById(lobby.host.id)

  if (!host) {
    deleteLobby(lobby.host)
    return
  }

  sendEvent(host, 'lobbyStateUpdate', {
    state: 'score',
  })

  lobby.players.forEach(player => {
    sendEvent(player.client, 'lobbyStateUpdate', {
      state: 'score',
    })
  })

  setTimeout(() => {
    // lobby.currentQuestionIndex++

    // sendEvent(host, 'currentQuestionIndexUpdate', {
    //   currentQuestionIndex: lobby.currentQuestionIndex,
    // })

    // lobby.players.forEach(player => {
    //   sendEvent(player.client, 'currentQuestionIndexUpdate', {
    //     currentQuestionIndex: lobby.currentQuestionIndex,
    //   })
    // })

    updateQuestionIndex(lobby.code, lobby.currentQuestionIndex + 1)

    handleDisplayQuestionState(lobby)
  }, 3000)
}

function handleEndState(lobby: Lobby) {
  const host = getWSClientById(lobby.host.id)

  if (!host) {
    deleteLobby(lobby.host)
    return
  }

  sendEvent(host, 'lobbyStateUpdate', {
    state: 'end',
  })

  lobby.players.forEach(player => {
    sendEvent(player.client, 'lobbyStateUpdate', {
      state: 'end',
    })
  })

  setTimeout(() => {
    deleteLobby(lobby.host)
  }, 3000)
}

export function handleQuestionAnswer({ client, ctx }: HandlerContext) {
  const { answer } = ctx

  if (!answer) return

  const lobby = getLobbyByPlayerId(client.id)

  if (!lobby) return

  let question = lobby.quiz.questions[lobby.currentQuestionIndex]

  if (!question) return

  if (question.questionType === 'multipleChoice') {
    question = question as MultipleChoiceQuestion
    const correctAnswerIndex = question.choices.findIndex(choice => choice.correct)

    if (correctAnswerIndex === -1) return

    if (answer === correctAnswerIndex) {
      const score = getPlayerScore(lobby.code, client.id)
      if (typeof score === 'number') {
        updatePlayerScore(lobby.code, client.id, score + 1000)
        console.log('correct answer')
      }
    }
  }

  if (lobby.answers.length === lobby.players.length) {
    //updateLobbyAnswers(lobby.code, [])
    handleScoreState(lobby)
  } else {
    //updateLobbyAnswers(lobby.code, lobby.answerCount + 1)
  }

  // TODO: Handle other question types
}
