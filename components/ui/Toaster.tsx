"use client"
import React, { createContext, useCallback, useContext } from 'react'
import Button from './ButtonOld'
import Card from './Card'

interface Toast {
  id: string
  timeout: NodeJS.Timeout
  message: string
  props: ToastProps
}

interface ToastProps {
  description?: string
  variant?: 'info' | 'success' | 'error'
  action?: {
    label: string
    onClick: () => void
  }
}

interface ToastContextType {
  toast: (message: string, props?: ToastProps) => void
  removeToast: (id: string) => void
  toasts: Toast[]
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = React.useState<Toast[]>([])

  const removeToast = useCallback((id: string) => {
    setToasts((prevToasts) => {
      const toastToRemove = prevToasts.find(t => t.id === id)

      if (toastToRemove) {
        clearTimeout(toastToRemove.timeout)
      }
      
      return prevToasts.filter((toast) => toast.id !== id)
    })
  }, [])

  const toast = useCallback((message: string, props?: ToastProps) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 9)
    const timeoutId = setTimeout(() => {
      removeToast(id)
    }, 5000)

    const newToast = { 
      id,
      timeout: timeoutId,
      message,
      props: props || {
        variant: 'info',
      }
    }

    setToasts((prevToasts) => {
      const toasts = [...prevToasts]

      if (toasts.length === 3) {
        toasts.shift()
      }

      return [...toasts, newToast]
    })
  }, [removeToast])

  return (
    <ToastContext.Provider value={{ toast, removeToast, toasts }}>
      { children }
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const context = useContext(ToastContext)

  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider')
  }

  return context.toast
}

export const ToasterCard = ({ toast, onRemove }: { toast: Toast; onRemove: (id: string) => void }) => {
  const variant = () => {
    switch (toast.props.variant) {
      case 'info':
        return 'blue'
      case 'error':
        return 'red'
      case 'success':
        return 'green'
      default:
        return 'gray'
    }
  }

  return (
    <Card variant={ variant() } className='pointer-events-auto'>
      <div className='bg-black/0 w-full h-full rounded flex gap-2 p-4'>
        <div className='flex-grow'>
          <p className="text-sm font-medium">{ toast.message }</p>
          <p className='text-sm'>{ toast.props.description }</p>
        </div>
        <Button
          variant={ variant() }
          onClick={() => {
            onRemove(toast.id)
            toast.props.action?.onClick()
          }}
          className='text-xs'
        >
          { toast.props.action?.label ? toast.props.action.label : 'Close' }
        </Button>
      </div>
    </Card>
  )
}

const Toaster = () => {
  const context = useContext(ToastContext)

  if (context === undefined) {
    throw new Error('Toaster must be used within a ToastProvider')
  }

  const { toasts, removeToast } = context

  return (
    <section className='fixed bottom-4 right-4 flex flex-col gap-3 z-50 w-full max-w-xs sm:max-w-sm md:max-w-md pointer-events-none'>
      {
        toasts.map((toast) => (
          <ToasterCard key={toast.id} toast={toast} onRemove={removeToast} />
        ))
      }
    </section>
  )
}


export default Toaster