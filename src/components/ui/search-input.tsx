import * as React from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export function SearchInput({ 
  className, 
  ...props 
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={`relative w-full ${className}`}>
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        className="pl-9"
        {...props}
      />
    </div>
  )
}
