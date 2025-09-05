import React from 'react'
import { HostLobbyState } from '../../providers/HostLobbyStateProvider'
import CurrentQuestionAnswers from '../ui/CurrentQuestionAnswers'
import Timer from '../ui/Timer'
import Image from 'next/image'

const AnswerPage = ({ hostLobbyState }: { hostLobbyState: HostLobbyState }) => {
  const backgroundIsImage = hostLobbyState.theme.background.startsWith('data:image/')
  let question: string

  if (!hostLobbyState.currentQuestion?.question) {
    question = "Missing question"
  } else {
    question = hostLobbyState.currentQuestion.question
  }

  return (
    <section 
      className='flex flex-col gap-4 items-center justify-between max-h-screen h-screen w-full p-4'
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
      <h1 className='text-center text-4xl font-semibold bg-white text-black p-4 w-full'>{ question }</h1>
      <div className='flex items-center justify-between p-4 w-full'>
        { hostLobbyState.timeout ? <Timer from={ hostLobbyState.timeout / 1000 } /> : <Timer from={ 0 } /> }
        { 
          hostLobbyState.currentQuestion?.image ?
            <div className='rounded-2xl h-full w-full object-fill'>
              <Image src={ hostLobbyState.currentQuestion.image } alt='image' width={ 1280 } height={ 720 } className='w-full h-full object-fill' />
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
      { hostLobbyState.currentQuestion ? <CurrentQuestionAnswers currentQuestion={ hostLobbyState.currentQuestion } showAnswers={ false } /> : null }
    </section>
  )
}

export default AnswerPage