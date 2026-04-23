import ImageInput from '@/components/ui/ImageInput'
import React, { useState, useEffect } from 'react'
import { useEditorStep } from '../../providers/editor-step-provider'
import { Question } from '@quizpot/quizcore'
import FancyCard from '@/components/ui/fancy-card'
import { useEditorQuiz } from '../../providers/editor-quiz-provider'
import FancyButton from '@/components/ui/fancy-button'
import { Loader2 } from 'lucide-react'
import { useEditorCurrentStep } from '../../providers/editor-current-step-provider'

const QuestionImageEditor = () => {
  const { quiz, setQuiz } = useEditorQuiz();
  const { currentStep } = useEditorCurrentStep();
  const { data } = useEditorStep<Question>();
  const [isUploading, setIsUploading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (currentStep === undefined || currentStep === null) return null;

  const updateQuizImage = (hash?: string, url?: string) => {
    const updatedSteps = [...quiz.steps];
    const targetStep = updatedSteps[currentStep];

    if (targetStep.type === 'question') {
      updatedSteps[currentStep] = {
        ...targetStep,
        data: { ...targetStep.data, imageHash: hash }
      };
    }

    setQuiz({
      ...quiz,
      images: hash && url ? { ...(quiz.images || {}), [hash]: url } : (quiz.images || {}),
      steps: updatedSteps
    });
  };

  const imageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/editor/quiz/upload-image', {
        method: 'POST',
        body: formData
      });
      const { hash, url } = await res.json();
      if (hash && url) updateQuizImage(hash, url);
    } catch (err) {
      console.error('Upload error:', err);
    } finally {
      setIsUploading(false);
    }
  };

  const currentHash = data?.imageHash;
  const imageUrl = (mounted && currentHash) ? quiz.images?.[currentHash] : null;

  if (isUploading) {
    return (
      <div className='flex items-center justify-center w-full p-8'>
        <Loader2 className='animate-spin w-8 h-8 text-white/50' />
      </div>
    );
  }

  if (!imageUrl || imageUrl === "undefined") {
    return (
      <section className='flex flex-col gap-4 items-center justify-center w-full h-full'>
        <ImageInput onChange={imageChange} />
      </section>
    );
  }

  return (
    <section className='flex flex-col gap-4 items-center justify-center w-full h-full'>
      <FancyCard>
        <img 
          src={ imageUrl }
          alt='Question' 
          className='max-h-96 object-contain rounded'
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      </FancyCard>
      <FancyButton 
        color='red' 
        onClick={() => updateQuizImage(undefined)}
      >
        Remove Image
      </FancyButton>
    </section>
  );
};

export default QuestionImageEditor;