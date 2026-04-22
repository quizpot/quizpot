import TextInput from '@/components/ui/text-input'
import { useEditorQuiz } from '../providers/editor-quiz-provider'

const QuizTitleEditor = ({ className }: { className?: string }) => {
  const { quiz, setQuiz } = useEditorQuiz()

  return (
    <TextInput className={ className } placeholder='Blank Quiz' value={ quiz.title || "" } onChange={ (e) => setQuiz({ ...quiz, title: e.target.value })} />
  )
}

export default QuizTitleEditor