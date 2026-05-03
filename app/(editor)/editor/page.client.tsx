"use client"

import EditorHeader from '@/components/editor/header/editor-header'
import { EditorQuizProvider } from '@/components/editor/providers/editor-quiz-provider'
import StepNavigator from '@/components/editor/navigation/step-navigator'
import { Quiz } from '@quizpot/quizcore'
import { EditorCurrentStepProvider } from '@/components/editor/providers/editor-current-step-provider'
import CurrentStepEditor from '@/components/editor/step/current-step-editor'
import { StepEditorSidebarProvider } from '@/components/editor/step/sidebar/step-editor-sidebar-provider'

const EditorPageClient = ({ 
  quiz, 
  initialSidebarOpen 
}: { 
  quiz: Quiz; 
  initialSidebarOpen: boolean 
}) => {
  return (
    <EditorCurrentStepProvider>
      <EditorQuizProvider quiz={quiz}>
        <StepEditorSidebarProvider initialOpen={initialSidebarOpen}>
          <main className="flex flex-col h-dvh w-full overflow-hidden">
            <EditorHeader />
            <section className="flex-1 flex flex-col-reverse md:flex-row min-h-0 overflow-hidden">
              <StepNavigator />
              <div className='flex-1 min-h-0 flex flex-col'>
                <CurrentStepEditor />
              </div>
            </section>
          </main>
        </StepEditorSidebarProvider>
      </EditorQuizProvider>
    </EditorCurrentStepProvider>
  )
}

export default EditorPageClient