import { StepEditorSidebarProvider } from './sidebar/step-editor-sidebar-provider'
import StepEditor from './step-editor'

const EmptyEditor = () => {
  return (
    <StepEditorSidebarProvider>
      <StepEditor className='flex items-center justify-center xl:rounded-tr-none'>
        Select a step ... 
      </StepEditor>
    </StepEditorSidebarProvider>
  )
}

export default EmptyEditor