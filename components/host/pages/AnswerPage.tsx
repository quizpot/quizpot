import { HostLobbyState } from '../../providers/HostLobbyStateProvider'
import CurrentQuestionAnswers from '../ui/CurrentQuestionAnswers'
import Timer from '../ui/Timer'
import QuestionImage from '../ui/QuestionImage'
import InvalidPage from './InvalidPage'
import FancyCard from '@/components/ui/fancy-card'
import NextQuestionButton from '../ui/NextQuestionButton'
import HostStatusLayout from '../layouts/HostStatusLayout'

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
    <HostStatusLayout>
      <section className='flex flex-col gap-4 items-center justify-between h-full w-full p-4'>
        <div className='flex gap-4 w-full'>
          <FancyCard color='white' className='text-center text-4xl font-semibold w-full py-4 px-4'>
            { question }
          </FancyCard>
          <NextQuestionButton className='h-full flex items-center font-semibold justify-center px-4 text-2xl' />
        </div>
        <div className='flex items-center justify-between p-4 w-full h-full'>
          { hostLobbyState.questionTimeout ? <Timer from={ hostLobbyState.questionTimeout / 1000 } /> : <Timer from={ 0 } /> }
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
    </HostStatusLayout>
  )
}

export default AnswerPage