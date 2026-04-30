import NextQuestionButton from '../ui/NextQuestionButton'
import CurrentQuestionAnswers from '../ui/CurrentQuestionAnswers'
import CurrentQuestionAnswersDisplay from '../ui/answerDisplay/CurrentQuestionAnswersDisplay'
import FancyCard from '@/components/ui/fancy-card'
import HostStatusLayout from '../layouts/HostStatusLayout'
import MessagePage from '@/components/ui/message-page'
import { HostLobbyState, isQuestion } from '@quizpot/quizcore'

const AnswersPage = ({ hostLobbyState }: { hostLobbyState: HostLobbyState }) => {
  const question = hostLobbyState.currentStep

  if (!question || !isQuestion(question)) {
    return <MessagePage message='No question to display. Press Space to skip.' />
  }

  return (
    <HostStatusLayout>
      <section className='flex flex-col gap-4 items-center justify-between h-full w-full p-4'>
        <div className='flex gap-4 w-full'>
          <FancyCard className='text-center text-4xl font-semibold w-full py-4 px-4'>
            { question.data.question }
          </FancyCard>
          <NextQuestionButton className='h-full flex items-center font-semibold justify-center px-4 text-2xl' />
        </div>
        <div className='flex items-center justify-center p-4 w-full h-full'>
          <CurrentQuestionAnswersDisplay currentQuestion={ question.data } answers={ hostLobbyState.answers } />
        </div>
        <CurrentQuestionAnswers currentQuestion={ question.data } showAnswers={ true } />
      </section>
    </HostStatusLayout>
  )
}

export default AnswersPage