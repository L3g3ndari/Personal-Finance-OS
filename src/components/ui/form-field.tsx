import * as React from "react"

export function FormField({ 
  label, 
  error, 
  children, 
  className 
}: { 
  label?: string; 
  error?: string; 
  children: React.ReactNode; 
  className?: string 
}) {
  return (
    <div className={`space-y-2 ${className}`}>
      {label && <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{label}</label>}
      {children}
      {error && <p className="text-xs font-medium text-destructive">{error}</p>}
    </div>
  )
}
