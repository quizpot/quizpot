import React from 'react'
import { HostLobbyState } from '../../providers/HostLobbyStateProvider'
import CurrentQuestionAnswer from '../ui/CurrentQuestionAnswer'
import Timer from '../ui/Timer'

const AnswerPage = ({ hostLobbyState }: { hostLobbyState: HostLobbyState }) => {
  
  let question: string

  if (!hostLobbyState.currentQuestion?.question) {
    question = "Missing question"
  } else {
    question = hostLobbyState.currentQuestion.question
  }

  return (
    <section className='flex flex-col gap-4 items-center justify-between h-screen w-full p-4'>
      <h1 className='text-center text-4xl font-semibold bg-white text-black p-4 w-full'>{ question }</h1>
      <div className='flex items-center justify-between p-4 w-full'>
        { hostLobbyState.timeout ? <Timer from={ hostLobbyState.timeout / 1000 } /> : <Timer from={ 0 } /> }
        { 
          hostLobbyState.currentQuestion?.image ?
           <div>
            Image not implemented yet...
           </div>
           : null
        }
        <div className='flex flex-col gap-2'>
          <div className='p-4 rounded-full bg-white text-black font-semibold text-4xl'>
            { hostLobbyState.answers.length }
          </div>
          <div className='p-1 rounded-full bg-white text-black font-semibold text-xs'>
            Answers
          </div>
        </div>
      </div>
      { hostLobbyState.currentQuestion ? <CurrentQuestionAnswer currentQuestion={ hostLobbyState.currentQuestion } /> : null }
    </section>
  )
}

export default AnswerPage