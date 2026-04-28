import { QuizTheme } from "@quizpot/quizcore"

export const getBackgroundStyles = (theme: QuizTheme) => {
  if (theme.background) {
    return {
      backgroundImage: `url(${theme.background})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }
  }
  else {
    return {
      backgroundColor: theme.color,
    }
  }
}