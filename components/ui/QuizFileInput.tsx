import React from 'react'
import FancyButton from './fancy-button'
import { Color } from '@/lib/Colors'
import { useTranslations } from 'next-intl'

const QuizFileInput = ({ 
  onChange, disabled, className, color 
}: { 
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, disabled?: boolean, className?: string, color?: Color 
}) => {
  const t = useTranslations('Buttons')

  return (
    <FancyButton color={ color } asChild>
      <input 
        type='file'
        accept='.qp, .json'
        placeholder={ t('quizFileInput') }
        disabled={ disabled }
        onChange={ onChange }
        className={ className }
      />
    </FancyButton>
  )
}

export default QuizFileInput