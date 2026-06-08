import * as React from "react"

const ModalContext = React.createContext<{ onClose: () => void } | undefined>(undefined)

export function Modal({ 
  children, 
  isOpen, 
  onClose 
}: { 
  children: React.ReactNode; 
  isOpen: boolean; 
  onClose: () => void 
}) {
  if (!isOpen) return null;

  return (
    <ModalContext.Provider value={{ onClose }}>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-background/80 backdrop-blur-sm" 
          onClick={onClose}
        />
        <div className="relative z-50 w-full max-w-lg border bg-card p-6 shadow-lg rounded-xl animate-in fade-in zoom-in duration-200">
          {children}
        </div>
      </div>
    </ModalContext.Provider>
  )
}

export function ModalHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={`flex flex-col space-y-1.5 text-center sm:text-left mb-4 ${className}`}>{children}</div>
}

export function ModalTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return <h2 className={`text-lg font-semibold leading-none tracking-tight ${className}`}>{children}</h2>
}

export function ModalDescription({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={`text-sm text-muted-foreground ${className}`}>{children}</p>
}

export function ModalFooter({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={`flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-6 ${className}`}>{children}</div>
}
