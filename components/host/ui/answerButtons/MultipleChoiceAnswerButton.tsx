import Button, { ButtonVariant } from '@/components/ui/Button'
import React from 'react'

const MultipleChoiceAnswerButton = ({ label, variant }: { label: string, variant: ButtonVariant }) => {
  return (
    <Button variant={ variant }>
      { label }
    </Button>
  )
}

export default MultipleChoiceAnswerButton