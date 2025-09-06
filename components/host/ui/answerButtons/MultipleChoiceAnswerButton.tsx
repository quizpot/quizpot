import Button from '@/components/ui/Button'
import { ColorVariants } from '@/lib/misc/ColorVariants'
import React from 'react'

const MultipleChoiceAnswerButton = ({ label, variant }: { label: string, variant: ColorVariants }) => {
  return (
    <Button variant={ variant }>
      { label }
    </Button>
  )
}

export default MultipleChoiceAnswerButton