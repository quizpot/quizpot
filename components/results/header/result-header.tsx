"use client"
import FancyButton from '@/components/ui/fancy-button'
import Link from 'next/link'
import { useResult } from '../providers/result-provider'

const ResultHeader = () => {
  const { result } = useResult()

  return (
    <header className='w-full flex justify-between p-2 h-16 shrink-0'>
      <div className='flex gap-2 items-center justify-center'>
        <FancyButton asChild>
          <Link href={'/dashboard/results'}>
            Quizpot
          </Link>
        </FancyButton>
        <FancyButton asChild>
          <Link href={'/editor?quizId=' + result.quiz.id}>
            { result.quiz.title }
          </Link>
        </FancyButton>
      </div>
    </header>
  )
}

export default ResultHeader