import React from 'react'
import { HostLobbyState } from '../../providers/HostLobbyStateProvider'
import NextQuestionButton from '../ui/NextQuestionButton'
import CurrentQuestionAnswers from '../ui/CurrentQuestionAnswers'
import CurrentQuestionAnswersDisplay from '../ui/answerDisplay/CurrentQuestionAnswersDisplay'

const AnswersPage = ({ hostLobbyState }: { hostLobbyState: HostLobbyState }) => {
  const backgroundIsImage = hostLobbyState.theme.background.startsWith('data:image/')
  let question: string

  if (!hostLobbyState.currentQuestion?.question) {
    question = "Missing question"
  } else {
    question = hostLobbyState.currentQuestion.question
  }

  return (
    <section 
      className='flex flex-col gap-4 items-center justify-between h-screen w-full p-4'
      style={
        backgroundIsImage ? { 
          backgroundImage: `url(${hostLobbyState.theme.background})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        } : { 
          backgroundColor: hostLobbyState.theme.background
        }
      }
    >
      <div className='absolute top-4 right-4'>
        <NextQuestionButton />
      </div>
      <h1 className='text-center text-4xl font-semibold bg-white text-black p-4 w-full'>{ question }</h1>
      <div className='flex items-center justify-center p-4 w-full h-full'>
        { hostLobbyState.currentQuestion ? <CurrentQuestionAnswersDisplay currentQuestion={ hostLobbyState.currentQuestion } answers={ hostLobbyState.answers } /> : null }
      </div>
      { hostLobbyState.currentQuestion ? <CurrentQuestionAnswers currentQuestion={ hostLobbyState.currentQuestion } showAnswers={ true } /> : null }
    </section>
  )
}

export default AnswersPage