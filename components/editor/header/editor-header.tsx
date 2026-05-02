import FancyButton from '@/components/ui/fancy-button'
import QuizTitleEditor from './quiz-title-editor'
import Link from 'next/link'
import QuizSettings from './quiz-settings'
import SaveQuiz from './save-quiz'

const EditorHeader = () => {
  return (
    <header className='w-full flex justify-between p-2 h-16 shrink-0'>
      <div className='flex gap-2 items-center justify-center'>
        <FancyButton asChild>
          <Link href={'/dashboard/quizzes'}>
            Quizpot
          </Link>
        </FancyButton>
        <QuizTitleEditor className='hidden md:block' />
        <QuizSettings />
      </div>
      <div className='flex gap-2'>
        <SaveQuiz />
      </div>
    </header>
  )
}

export default EditorHeader