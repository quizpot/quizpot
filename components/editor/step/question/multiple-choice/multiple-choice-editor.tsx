import StepEditor from '../../step-editor'
import StepEditorSidebar from '../../sidebar/step-editor-sidebar'
import QuestionQuestionEditor from '../question-question-editor'
import StepEditorSidebarToggle from '../../sidebar/step-editor-sidebar-toggle'
import QuestionImageEditor from '../question-image-editor'
import ChoicesEditor from './choices-editor'
import QuestionDisplayTimeoutEditor from '../question-display-timeout-editor'
import QuestionAnswerTimeoutEditor from '../question-answer-timeout-editor'

const MultipleChoiceEditor = () => {
  return (
    <div className="relative flex flex-1 h-full w-full overflow-hidden min-h-0">
      <StepEditor className='p-4 flex flex-col gap-4 min-h-0'>
        <div className='flex gap-4 shrink-0'>
          <QuestionQuestionEditor />
          <StepEditorSidebarToggle />
        </div>
        <div className="flex-1 min-h-0 w-full flex items-center justify-center">
          <QuestionImageEditor />
        </div>
        <div className='shrink-0'>
          <ChoicesEditor />
        </div>
      </StepEditor>
      <StepEditorSidebar>
        <QuestionDisplayTimeoutEditor />
        <QuestionAnswerTimeoutEditor />
      </StepEditorSidebar>
    </div>
  )
}

export default MultipleChoiceEditor