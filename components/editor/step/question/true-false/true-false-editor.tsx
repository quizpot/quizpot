import StepEditor from '../../step-editor'
import StepEditorSidebar from '../../sidebar/step-editor-sidebar'
import QuestionQuestionEditor from '../question-question-editor'
import StepEditorSidebarToggle from '../../sidebar/step-editor-sidebar-toggle'
import QuestionImageEditor from '../question-image-editor'
import QuestionDisplayTimeoutEditor from '../question-display-timeout-editor'
import QuestionAnswerTimeoutEditor from '../question-answer-timeout-editor'
import TrueFalseAnswerEditor from './true-false-answer-editor'

const TrueFalseEditor = () => {
  return (
    <div className="relative flex h-full w-full overflow-hidden">
      <StepEditor className='p-4 flex flex-col justify-between'>
        <div className='flex gap-4'>
          <QuestionQuestionEditor />
          <StepEditorSidebarToggle />
        </div>
        <QuestionImageEditor />
        <section className='flex flex-col md:flex-row gap-4 w-full'>
          <TrueFalseAnswerEditor color='green' index={0} />
          <TrueFalseAnswerEditor color='red' index={1} />
        </section>
      </StepEditor>
      <StepEditorSidebar>
        <QuestionDisplayTimeoutEditor />
        <QuestionAnswerTimeoutEditor />
      </StepEditorSidebar>
    </div>
  )
}

export default TrueFalseEditor