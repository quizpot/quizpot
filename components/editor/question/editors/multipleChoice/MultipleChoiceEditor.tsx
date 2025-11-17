import QuestionChoiceAdd from './ui/QuestionChoiceAdd'
import QuestionChoiceRemove from './ui/QuestionChoiceRemove'
import { MultipleChoiceQuestion } from '@/lib/QuizFile'
import ChoiceEditor from './ui/ChoiceEditor'
import QuestionEditorLayout from '../../ui/QuestionEditorLayout'
import MultipleChoiceSidebar from './ui/MultipleChoiceSidebar'

const MultipleChoiceEditor = ({ question }: { question: MultipleChoiceQuestion }) => {
  return (
    <QuestionEditorLayout sidebar={ <MultipleChoiceSidebar /> }>
      <div className='grid grid-cols-2 p-4 gap-4'>
        {
          question.choices.map((choice, index) => {
            return (
              <ChoiceEditor key={ index } index={ index } />
            )
          })
        }
      </div>
      <div className='flex items-center justify-center gap-4 p-4'>
        <QuestionChoiceAdd />
        <QuestionChoiceRemove />
      </div>
    </QuestionEditorLayout>
  )
}

export default MultipleChoiceEditor