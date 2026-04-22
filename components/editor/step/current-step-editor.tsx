import { useEditorCurrentStep } from '../providers/editor-current-step-provider'
import { useEditorQuiz } from '../providers/editor-quiz-provider'
import EmptyEditor from './empty-editor'
import { EditorStepProvider } from './question/editor-step-provider'
import MultipleChoiceEditor from './question/multiple-choice-editor'

const CurrentStepEditor = () => {
  const { quiz } = useEditorQuiz()
  const { currentStep } = useEditorCurrentStep()

  if (currentStep === null) {
    return <EmptyEditor />
  }

  const step = quiz.steps[currentStep]

  const renderEditor = () => {
    if (step.type === 'question') {
      switch (step.data.questionType) {
        case 'multipleChoice':
          return <MultipleChoiceEditor />
        case 'trueFalse':
          return <h1>True/false editor ...</h1>
        case 'shortAnswer':
          return <h1>Short answer editor ...</h1>
      }
    } else if (step.type === 'slide') {
      switch (step.data.slideType) {
        case 'title':
          return <h1>Title slide editor ...</h1>
        case 'content':
          return <h1>Content slide editor ...</h1>
      }
    }
    return null
  }

  return (
    <EditorStepProvider>
      { renderEditor() }
    </EditorStepProvider>
  )
}

export default CurrentStepEditor