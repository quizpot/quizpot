import CurrentQuestionAnswers from '../ui/CurrentQuestionAnswers'
import Timer from '../ui/Timer'
import QuestionImage from '../ui/QuestionImage'
import FancyCard from '@/components/ui/fancy-card'
import NextQuestionButton from '../ui/NextQuestionButton'
import HostStatusLayout from '../layouts/HostStatusLayout'
import { HostLobbyState, isQuestion } from '@quizpot/quizcore'

const AnswerPage = ({ hostLobbyState }: { hostLobbyState: HostLobbyState }) => {
  const question = hostLobbyState.currentQuestion

  if (!question) return null

  return null

  // return (
  //   <HostStatusLayout>
  //     <section className='flex flex-col gap-4 items-center justify-between h-full w-full p-4'>
  //       <div className='flex gap-4 w-full'>
  //         <FancyCard className='text-center text-4xl font-semibold w-full py-4 px-4'>
  //           { hostLobbyState.currentQuestion?.question }
  //         </FancyCard>
  //         <NextQuestionButton className='h-full flex items-center font-semibold justify-center px-4 text-2xl' />
  //       </div>
  //       <div className='flex items-center justify-between p-4 w-full h-full'>
  //         {/* { hostLobbyState.timeout ? <Timer from={ hostLobbyState.timeout / 1000 } /> : <Timer from={ 0 } /> } */}
  //         <QuestionImage src={ question.imageHash } />
  //         <div className='flex flex-col gap-2'>
  //           <div className='h-24 w-24 p-4 flex items-center justify-center rounded-full bg-white text-black font-semibold text-4xl'>
  //             { hostLobbyState.answers.length }
  //           </div>
  //           <div className='p-1 rounded-full bg-white text-black font-semibold text-xs text-center'>
  //             Answers
  //           </div>
  //         </div>
  //       </div>
  //       { hostLobbyState.currentQuestion ? <CurrentQuestionAnswers currentQuestion={ hostLobbyState.currentQuestion } showAnswers={ false } /> : null }
  //     </section>
  //   </HostStatusLayout>
  // )
}

export default AnswerPage