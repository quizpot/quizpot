import React from 'react'
import { HostLobbyState } from '../../providers/HostLobbyStateProvider'
import CurrentQuestionAnswers from '../ui/CurrentQuestionAnswers'
import Timer from '../ui/Timer'
import { getBackgroundStyles } from '@/lib/client/BackgroundStyles'
import QuestionImage from '../ui/QuestionImage'
import InvalidPage from './InvalidPage'
import FancyCard from '@/components/ui/fancy-card'

const AnswerPage = ({ hostLobbyState }: { hostLobbyState: HostLobbyState }) => {
  let question: string

  if (hostLobbyState.currentQuestion?.questionType === 'slide') 
    return <InvalidPage hostLobbyState={ hostLobbyState } message='Invalid question type for answer page.' />

  if (!hostLobbyState.currentQuestion?.question) {
    question = "Missing question"
  } else {
    question = hostLobbyState.currentQuestion.question
  }

  return (
    <section 
      className='flex flex-col gap-4 items-center justify-between max-h-screen h-screen w-full p-4'
      style={ getBackgroundStyles(hostLobbyState.theme.background) }
    >
      <FancyCard color='white' className='text-center text-4xl font-semibold w-full py-4 px-4'>
        { question }
      </FancyCard>
      <div className='flex items-center justify-between p-4 w-full h-full'>
        { hostLobbyState.timeout ? <Timer from={ hostLobbyState.timeout / 1000 } /> : <Timer from={ 0 } /> }
        <QuestionImage src={ hostLobbyState.currentQuestion?.image } />
        <div className='flex flex-col gap-2'>
          <div className='h-24 w-24 p-4 flex items-center justify-center rounded-full bg-white text-black font-semibold text-4xl'>
            { hostLobbyState.answers.length }
          </div>
          <div className='p-1 rounded-full bg-white text-black font-semibold text-xs text-center'>
            Answers
          </div>
        </div>
      </div>
      { hostLobbyState.currentQuestion ? <CurrentQuestionAnswers currentQuestion={ hostLobbyState.currentQuestion } showAnswers={ false } /> : null }
    </section>
  )
}

export default AnswerPage