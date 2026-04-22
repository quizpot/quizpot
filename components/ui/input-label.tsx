import { cn } from '@/lib/utils'

const InputLabel = ({
  label,
  className,
}: {
  label: string,
  className?: string,
}) => {
  return (
    <label 
      className={ cn(
        'text-xs font-bold uppercase tracking-wider text-neutral-500 ml-2', 
        className
      ) }
    >
      { label }
    </label>
  )
}

export default InputLabel