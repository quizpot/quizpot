import MultipleChoicePlayerAnswerButton from './multipleChoice/MultipleChoicePlayerAnswerButton'
import TrueFalsePlayerAnswerButton from './trueFalse/TrueFalsePlayerAsnwerButton'
import ShortAnswerPlayerInput from './shortAnswer/ShortAnswerPlayerInput'
import { colorKeys } from '@/lib/colors'
import { SafeQuestion } from '@quizpot/quizcore'
import MessagePage from '@/components/ui/message-page'

const QuestionAnswers = ({ question }: { question: SafeQuestion }) => {
  if (question.questionType === 'multipleChoice') {
    return (
      <section className='grid grid-cols-2 gap-4 grid-flow-row h-full w-full p-4'>
        {
          question.choices.map((choice, index) => {
            return (
              <MultipleChoicePlayerAnswerButton 
                choice={ choice } 
                index={ index } 
                key={ index } 
                color={ colorKeys[index % 10] } 
              />
            )
          })
        }
      </section>
    )
  }

  if (question.questionType === 'trueFalse') {
    return (
      <section className='grid grid-cols-2 gap-4 grid-flow-row w-full h-full p-4'>
        <TrueFalsePlayerAnswerButton index={0} value={ true } color='red' />
        <TrueFalsePlayerAnswerButton index={1} value={ false } color='blue' />
      </section>
    )
  }

  if (question.questionType === 'shortAnswer') {
    return (
      <section className='flex flex-col gap-2 items-center justify-center w-full h-full'>
        <ShortAnswerPlayerInput />
      </section>
    )
  }

  return <MessagePage message='Unknown question type ...' />
}

export default QuestionAnswers