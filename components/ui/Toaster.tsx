"use client"
import React, { useCallback, useContext } from 'react'

interface Toast {
  id: string
  message: string
  type: 'info' | 'success' | 'error'
}

interface ToastContextType {
  addToast: (toast: Omit<Toast, 'id'>) => void
  removeToast: (id: string) => void
  toasts: Toast[]
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined)

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = React.useState<Toast[]>([])

  const removeToast = useCallback((id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
  }, [])

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 9)
    const newToast = { ...toast, id }
    setToasts((prevToasts) => [...prevToasts, newToast])

    setTimeout(() => {
      removeToast(id)
    }, 3000)
  }, [removeToast])

  return (
    <ToastContext.Provider value={{ addToast, removeToast, toasts }}>
      { children }
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const context = useContext(ToastContext)

  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider')
  }

  return context.addToast
}

export const ToasterCard = ({ toast, onRemove }: { toast: Toast; onRemove: (id: string) => void }) => {
  const baseClasses = 'flex gap-2 items-center p-4 rounded-2xl border shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105'
  let typeClasses = ''

  switch (toast.type) {
    case 'info':
      typeClasses = 'bg-blue-100 border-blue-500 text-blue-800'
      break
    case 'error':
      typeClasses = 'bg-red-100 border-red-500 text-red-800'
      break
    case 'success':
      typeClasses = 'bg-green-100 border-green-500 text-green-800'
      break
    default:
      typeClasses = 'bg-neutral-100 border-neutral-400 text-neutral-800'
  }

  return (
    <section className={`${baseClasses} ${typeClasses} w-full max-w-sm pointer-events-auto`}>
      <p className="flex-grow text-sm font-medium">{toast.message}</p>
      <button
        onClick={() => onRemove(toast.id)}
        className="ml-4 px-3 py-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 text-xs font-semibold"
        aria-label="Close toast"
      >
        Close
      </button>
    </section>
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