"use client"
import EditorHeader from '@/components/editor/header/editor-header'
import { EditorQuizProvider } from '@/components/editor/providers/editor-quiz-provider'
import StepNavigator from '@/components/editor/navigation/step-navigator'
import { Quiz } from '@quizpot/quizcore'
import { EditorCurrentStepProvider } from '@/components/editor/providers/editor-current-step-provider'
import CurrentStepEditor from '@/components/editor/step/current-step-editor'

const EditorPageClient = ({ quiz }: { quiz: Quiz }) => {
  return (
    <EditorCurrentStepProvider>
      <EditorQuizProvider quiz={ quiz }>
        <main className='flex flex-col h-dvh w-full'>
          <EditorHeader />
          <section className='flex h-[calc(100vh_-_4rem)] flex-col-reverse md:flex-row'>
            <StepNavigator />
            <main className='w-full h-full flex'>
              <CurrentStepEditor />
            </main>
          </section>
        </main>
      </EditorQuizProvider>
    </EditorCurrentStepProvider>
  )
}

export default EditorPageClient