import { MultipleChoiceQuestion } from '@quizpot/quizcore'
import TextInput from '@/components/ui/text-input'
import { useEditorStep } from './editor-step-provider'
import StepEditor from '../step-editor'
import StepEditorSidebar from '../step-editor-sidebar'

const MultipleChoiceEditor = () => {
  const { data, setData } = useEditorStep<MultipleChoiceQuestion>()

  return (
    <>
      <StepEditor className='p-4'>
        <TextInput value={ data.question } onChange={ (e) => {
          setData({
            ...data,
            question: e.target.value
          })
        } } />
      </StepEditor>
      <StepEditorSidebar>
        bruh
      </StepEditorSidebar>
    </>
  )
}

export default MultipleChoiceEditor