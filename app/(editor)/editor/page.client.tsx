"use client"
import EditorHeader from '@/components/editor/header/editor-header'
import { EditorQuizProvider } from '@/components/editor/providers/EditorQuizProvider'
import StepNavigator from '@/components/editor/navigation/step-navigator'
import { Quiz } from '@quizpot/quizcore'

const EditorPageClient = ({ quiz }: { quiz: Quiz }) => {
  return (
    <EditorQuizProvider quiz={ quiz }>
      <main className='flex flex-col h-dvh w-full'>
        <EditorHeader />
        <section className='flex h-[calc(100vh_-_4rem)] flex-col-reverse md:flex-row'>
          <StepNavigator />
          <main className='w-full h-full flex'>
            <div className='w-full h-full bg-neutral-800 md:rounded-tl-xl xl:rounded-tr-xl'>
              
            </div>
            <div className='w-0 xl:min-w-96 xl:w-96'></div>
          </main>
        </section>
      </main>
    </EditorQuizProvider>
  )
}

export default EditorPageClient