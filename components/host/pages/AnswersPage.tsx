import NextQuestionButton from '../ui/NextQuestionButton'
import CurrentQuestionAnswers from '../ui/CurrentQuestionAnswers'
import CurrentQuestionAnswersDisplay from '../ui/answerDisplay/CurrentQuestionAnswersDisplay'
import InvalidPage from './InvalidPage'
import FancyCard from '@/components/ui/fancy-card'
import HostStatusLayout from '../layouts/HostStatusLayout'

const AnswersPage = ({ hostLobbyState }: { hostLobbyState: HostLobbyState }) => {
  return <>Answers Page</>
  // let question: string

  // if (hostLobbyState.currentQuestion?.questionType === 'slide') 
  //   return <InvalidPage hostLobbyState={ hostLobbyState } message='Invalid question type for answers page.' />

  // if (!hostLobbyState.currentQuestion?.question) {
  //   question = "Missing question"
  // } else {
  //   question = hostLobbyState.currentQuestion.question
  // }

  // return (
  //   <HostStatusLayout>
  //     <section className='flex flex-col gap-4 items-center justify-between h-full w-full p-4'>
  //       <div className='flex gap-4 w-full'>
  //         <FancyCard color='white' className='text-center text-4xl font-semibold w-full py-4 px-4'>
  //           { question }
  //         </FancyCard>
  //         <NextQuestionButton className='h-full flex items-center font-semibold justify-center px-4 text-2xl' />
  //       </div>
  //       <div className='flex items-center justify-center p-4 w-full h-full'>
  //         { hostLobbyState.currentQuestion ? <CurrentQuestionAnswersDisplay currentQuestion={ hostLobbyState.currentQuestion } answers={ hostLobbyState.answers } /> : null }
  //       </div>
  //       { hostLobbyState.currentQuestion ? <CurrentQuestionAnswers currentQuestion={ hostLobbyState.currentQuestion } showAnswers={ true } /> : null }
  //     </section>
  //   </HostStatusLayout>
  // )
}

export default AnswersPage