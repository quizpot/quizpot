import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import React from 'react'

const QuizSettings = () => {
  const [open, setOpen] = React.useState(false)

  return (
    <Dialog open={ open } onOpenChange={ setOpen }>
      <DialogTrigger>
        Settings
      </DialogTrigger>
      <DialogContent>
        <DialogHeader title='Settings'/>

      </DialogContent>
    </Dialog>
  )
}

export default QuizSettings