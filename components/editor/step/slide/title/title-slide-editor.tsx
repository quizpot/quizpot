'use client'

import StepEditor from '../../step-editor'
import TitleSlideSubtitleEditor from './title-slide-subtitle-editor'
import TitleSlideTitleEditor from './title-slide-title-editor'

const TitleSlideEditor = () => {
  return (
    <div className="relative flex flex-1 h-full w-full overflow-hidden min-h-0">
      <StepEditor className='p-4 flex flex-col items-center justify-center gap-8 h-full w-full'>
        <div className="flex flex-col gap-4 w-full max-w-4xl">
          <TitleSlideTitleEditor />
          <TitleSlideSubtitleEditor />
        </div>
      </StepEditor>
    </div>
  )
}

export default TitleSlideEditor