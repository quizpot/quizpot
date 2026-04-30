import MultipleChoiceGraph from './MultipleChoiceGraph'
import AnswerCard from './AnswerCard'
import { colorKeys } from '@/lib/colors'
import { Answer, Question } from '@quizpot/quizcore'

const CurrentQuestionAnswersDisplay = ({ currentQuestion, answers }: { currentQuestion: Question, answers: Answer[] }) => {
  if (currentQuestion.questionType === 'multipleChoice') {
    const pillars: Answer[][] = []
    
    currentQuestion.choices.forEach(() => { pillars.push([]) })

    answers.forEach(answer => {
      if (answer.submission.type !== 'multipleChoice') return console.log("Answer is not multiple choice")
      answer.submission.choices.map(choice => {
        pillars[choice].push(answer)
      })
    })

    const maxAnswers = Math.max(...pillars.map(pillar => pillar.length))

    return (
      <div className='flex gap-8 h-full'>
        { 
          pillars.map((pillar, index) => {
            return (
              <MultipleChoiceGraph 
                key={ index } 
                color={ colorKeys[index % 10] }
                answers={ pillar.length } 
                maxAnswers={ maxAnswers } 
                correctAnswer={ currentQuestion.choices[index].correct } 
              />
            )
          }) 
        }
      </div>
    )
  }

  if (currentQuestion.questionType === 'trueFalse') {
    const pillars: Answer[][] = [[], []]

    answers.forEach(answer => {
      if (answer.submission.type !== 'trueFalse') return console.log("Answer is not multiple choice")
      
      if (answer.submission.answer) {
        pillars[0].push(answer)
      } else {
        pillars[1].push(answer)
      }
    })

    const maxAnswers = Math.max(...pillars.map(pillar => pillar.length))
    const correctPillarIndex = currentQuestion.answer ? 0 : 1

    return (
      <div className='flex gap-8 h-full'>
        { 
          pillars.map((pillar, index) => {
            return (
              <MultipleChoiceGraph key={ index } color={ colorKeys[index] } answers={ pillar.length } maxAnswers={ maxAnswers } correctAnswer={ index === correctPillarIndex } />
            )
          }) 
        }
      </div>
    )
  }

  if (currentQuestion.questionType === 'shortAnswer') {
    const data = new Map<string, { count: number, correct: boolean }>()

    answers.forEach(answer => {
      if (answer.submission.type !== 'shortAnswer') return
      const currentCount = data.get(answer.submission.answer)?.count || 0
      data.set(answer.submission.answer, { count: (currentCount + 1), correct: answer.isCorrect})
    })

    // TODO: Fix not displaying correct answer...
    // answers.filter(a => a.isCorrect).map(a => {
    //   if (a.answer.answerType !== 'shortAnswer') return
      
    //   if (data.get(a.answer.answer) !== undefined) {
    //     data.set(a.answer.answer, { count: 0, correct: true })
    //   }
    // })

    return (
      <div className='flex flex-row gap-8 items-center justify-center h-full w-full'>
        { 
          Array.from(data.entries()).map(([answerText, obj]) => {
            return (
              <AnswerCard
                key={ answerText }
                answers={ obj.count }
                answer={ answerText }
                correct={ obj.correct }
              />
            )
          }) 
        }
      </div>
    )
  }

  return (
    <div>
      Unsupported question type
    </div>
  )
}

export default CurrentQuestionAnswersDisplay