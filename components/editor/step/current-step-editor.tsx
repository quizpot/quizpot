import { useEditorCurrentStep } from '../providers/editor-current-step-provider'
import { useEditorQuiz } from '../providers/editor-quiz-provider'
import { EditorStepProvider } from '../providers/editor-step-provider'
import EmptyEditor from './empty-editor'
import MultipleChoiceEditor from './question/multiple-choice/multiple-choice-editor'
import ShortAnswerEditor from './question/short-answer/short-answer-editor'
import TrueFalseEditor from './question/true-false/true-false-editor'
import TitleSlideEditor from './slide/title/title-slide-editor'
import ContentSlideEditor from './slide/content/content-slide-editor'

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
          return <TrueFalseEditor />
        case 'shortAnswer':
          return <ShortAnswerEditor />
      }
    } else if (step.type === 'slide') {
      switch (step.data.slideType) {
        case 'title':
          return <TitleSlideEditor />
        case 'content':
          return <ContentSlideEditor />
      }
    }
    return <EmptyEditor />
  }

  return (
    <EditorStepProvider>
      { renderEditor() }
    </EditorStepProvider>
  )
}

export default CurrentStepEditor