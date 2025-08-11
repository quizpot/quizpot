import { sendEvent } from "../managers/EventManager"
import { deleteLobby, Lobby } from "../managers/LobbyManager"
import { getWSClientById } from "../managers/WSClientManager"

export function startGame(lobby: Lobby) {
  handleDisplayQuestion(lobby)
}

function handleDisplayQuestion(lobby: Lobby) {
  const host = getWSClientById(lobby.hostId)

  if (!host) {
    deleteLobby(lobby.hostId)
    return
  }

  const quiz = lobby.quiz
  const question = quiz.questions[lobby.currentQuestionIndex]

  sendEvent(host, 'lobbyStateUpdate', {
    state: 'question',
    question: question,
  })

  lobby.players.forEach(player => {
    sendEvent(player.client, 'lobbyStateUpdate', {
      state: 'question',
      question: question,
    })
  })

  setTimeout(() => {
    handleQuestionAnswer(lobby)
  }, question.questionDisplayTime * 1000)
}

function handleQuestionAnswer(lobby: Lobby) {
  const host = getWSClientById(lobby.hostId)

  if (!host) {
    deleteLobby(lobby.hostId)
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
      handleEnd(lobby)
    } else {
      handleScore(lobby)
    }
  }, question.timeLimit * 1000)

  //Clear timeout when everyone answered
  //clearTimeout(timeout)
}

function handleScore(lobby: Lobby) {
  const host = getWSClientById(lobby.hostId)

  if (!host) {
    deleteLobby(lobby.hostId)
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
    lobby.currentQuestionIndex++

    sendEvent(host, 'currentQuestionIndexUpdate', {
      currentQuestionIndex: lobby.currentQuestionIndex,
    })

    lobby.players.forEach(player => {
      sendEvent(player.client, 'currentQuestionIndexUpdate', {
        currentQuestionIndex: lobby.currentQuestionIndex,
      })
    })

    handleDisplayQuestion(lobby)
  }, 3000)
}

function handleEnd(lobby: Lobby) {
  const host = getWSClientById(lobby.hostId)

  if (!host) {
    deleteLobby(lobby.hostId)
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
    deleteLobby(lobby.hostId)
  }, 3000)
}

