"use effect"

import ResultHeader from '@/components/results/header/result-header';
import StepNavigator from '@/components/results/navigation/step-navigator'
import { ResultCurrentStepProvider } from '@/components/results/providers/result-current-step-provider';
import { ResultProvider } from '@/components/results/providers/result-provider';
import DisplayCurrentResult from '@/components/results/result/display-current-result';
import { QuizResult } from '@quizpot/quizcore'

const ResultPageClient = ({
  result
}: { 
  result: QuizResult;
}) => {
  return (
    <ResultCurrentStepProvider>
      <ResultProvider result={ result }>
        <main className="flex flex-col h-dvh w-full overflow-hidden">
          <ResultHeader />
          <section className="flex-1 flex flex-col-reverse md:flex-row min-h-0 overflow-hidden">
            <StepNavigator />
            <div className='flex-1 min-h-0 flex flex-col'>
              <DisplayCurrentResult />
            </div>
          </section>
        </main>
      </ResultProvider>
    </ResultCurrentStepProvider>
  )
}

export default ResultPageClient