import StepEditor from '../../step-editor'
import StepEditorSidebar from '../../sidebar/step-editor-sidebar'
import { StepEditorSidebarProvider } from '../../sidebar/step-editor-sidebar-provider'
import QuestionQuestionEditor from '../question-question-editor'
import StepEditorSidebarToggle from '../../sidebar/step-editor-sidebar-toggle'
import QuestionImageEditor from '../question-image-editor'
import ChoicesEditor from './choices-editor'
import QuestionDisplayTimeoutEditor from '../question-display-timeout-editor'
import QuestionAnswerTimeoutEditor from '../question-answer-timeout-editor'

const MultipleChoiceEditor = () => {
  return (
    <StepEditorSidebarProvider>
      <div className="relative flex h-full w-full overflow-hidden">
        <StepEditor className='p-4 flex flex-col gap-4 justify-between min-h-0'>
          <div className='flex gap-4'>
            <QuestionQuestionEditor />
            <StepEditorSidebarToggle />
          </div>
          <QuestionImageEditor />
          <ChoicesEditor />
        </StepEditor>
        <StepEditorSidebar>
          <QuestionDisplayTimeoutEditor />
          <QuestionAnswerTimeoutEditor />
        </StepEditorSidebar>
      </div>
    </StepEditorSidebarProvider>
  )
}

export default MultipleChoiceEditor