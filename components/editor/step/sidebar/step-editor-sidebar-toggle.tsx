import { useStepEditorSidebar } from './step-editor-sidebar-provider'
import FancyButton from '@/components/ui/fancy-button'
import { PanelRightClose, PanelRightOpen } from 'lucide-react'

const StepEditorSidebarToggle = ({ className }: { className?: string }) => {
  const { open, setOpen } = useStepEditorSidebar()

  return (
    <FancyButton color='background' className={ className } onClick={ () => setOpen(!open) }>
      { open ? <PanelRightClose /> : <PanelRightOpen /> }
    </FancyButton>
  )
}

export default StepEditorSidebarToggle