import CurrentQuestionAnswers from '../ui/CurrentQuestionAnswers'
import Timer from '../ui/Timer'
import QuestionImage from '../ui/QuestionImage'
import FancyCard from '@/components/ui/fancy-card'
import NextQuestionButton from '../ui/NextQuestionButton'
import HostStatusLayout from '../layouts/HostStatusLayout'
import { HostLobbyState, isQuestion } from '@quizpot/quizcore'
import MessagePage from '@/components/ui/message-page'

const AnswerPage = ({ hostLobbyState }: { hostLobbyState: HostLobbyState }) => {
  const question = hostLobbyState.currentStep
  if (!question || !isQuestion(question)) {
    return <MessagePage message='Waiting for question...' />
  }

  const secondsLeft = hostLobbyState.timeout
    ? Math.max(0, Math.round(
        (new Date(hostLobbyState.timeout).getTime() +
        question.data.timeLimit * 1000 -
        Date.now()) / 1000
      ))
    : 0

  return (
    <HostStatusLayout>
      <section className='flex flex-col gap-4 items-center justify-between h-full w-full p-4'>
        <div className='flex gap-4 w-full'>
          <FancyCard className='text-center text-4xl font-semibold w-full py-4 px-4'>
            {question.data.question}
          </FancyCard>
          <NextQuestionButton className='h-full flex items-center font-semibold justify-center px-4 text-2xl' />
        </div>
        <div className='flex items-center justify-between p-4 w-full h-full'>
          <div className='flex flex-col gap-4'>
            <Timer from={secondsLeft} />
            <FancyCard className='p-1 rounded-full font-semibold text-xs text-center'>
              Timer
            </FancyCard>
          </div>
          <QuestionImage src={question.data.imageHash} />
          <div className='flex flex-col gap-4'>
            <FancyCard className='h-24 w-24 p-4 flex items-center justify-center rounded-full font-semibold text-4xl'>
              {hostLobbyState.answers.length}
            </FancyCard>
            <FancyCard className='p-1 rounded-full font-semibold text-xs text-center'>
              Answers
            </FancyCard>
          </div>
        </div>
        <CurrentQuestionAnswers currentQuestion={question.data} showAnswers={false} />
      </section>
    </HostStatusLayout>
  )
}

export default AnswerPage