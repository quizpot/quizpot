import { useEditorStep } from '@/components/editor/providers/editor-step-provider'
import FancyButton from '@/components/ui/fancy-button'
import { MultipleChoiceQuestion } from '@quizpot/quizcore'
import ChoiceEditor from './choice-editor'
import { colorIcons } from '@/lib/colors'

const ChoicesEditor = () => {
  const { data, setData } = useEditorStep<MultipleChoiceQuestion>()
  const iconicColors = Object.keys(colorIcons) as (keyof typeof colorIcons)[]

  const canAdd = data.choices.length < 6
  const canRemove = data.choices.length > 2

  const addChoice = () => {
    if (!canAdd) return

    const choices = [...data.choices]
    choices.push({
      text: '',
      correct: false
    })
    setData({ ...data, choices })
  }

  const removeChoice = () => {
    if (!canRemove) return

    const choices = [...data.choices]
    choices.pop()
    setData({ ...data, choices })
  }

  return (
    <section className='flex flex-col gap-4 max-h-96'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 overflow-x-clip overflow-y-auto p-1'>
        {
          data.choices.map((choice, index) => (
            <ChoiceEditor 
              key={ index } 
              color={ iconicColors[index % iconicColors.length] } 
              index={ index } 
            />
          ))
        }
      </div>
      <div className='flex gap-4'>
        <FancyButton 
          color='green' 
          className='w-full disabled:opacity-50 disabled:cursor-not-allowed' 
          onClick={ addChoice }
          disabled={ !canAdd }
        >
          { canAdd ? 'Add Choice' : 'Max Choices' }
        </FancyButton>
        <FancyButton 
          color='red' 
          className='w-full disabled:opacity-50 disabled:cursor-not-allowed' 
          onClick={ removeChoice }
          disabled={ !canRemove }
        >
          { canRemove ? 'Remove Choice' : 'Min 2 Required' }
        </FancyButton>
      </div>
    </section>
  )
}

export default ChoicesEditor