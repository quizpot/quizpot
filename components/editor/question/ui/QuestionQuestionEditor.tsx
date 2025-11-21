import TextInput from "@/components/ui/TextInput"
import { useEditorCurrentQuestion } from "../../providers/EditorCurrentQuestionProvider"
import { useEditorQuizFile } from "../../providers/EditorQuizFileProvider"

const QuestionQuestionEditor = () => {
  const { quizFile, setQuizFile } = useEditorQuizFile()
  const { currentQuestionIndex } = useEditorCurrentQuestion()
  const currentQuestion = quizFile.questions[currentQuestionIndex]

  if (currentQuestion.questionType === 'slide') return <></>

  return (
    <TextInput value={ currentQuestion.question } color="white" className='text-2xl p-4 w-full text-center' 
      onChange={(e) => {
        const updatedQuestions = [...quizFile.questions]

        if (updatedQuestions[currentQuestionIndex].questionType === 'slide') return

        updatedQuestions[currentQuestionIndex] = {
          ...updatedQuestions[currentQuestionIndex],
          question: e.target.value,
        }

        setQuizFile({ ...quizFile, questions: updatedQuestions })
      }}
    />
  )
}

export default QuestionQuestionEditor