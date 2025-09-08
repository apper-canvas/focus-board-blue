import React, { forwardRef } from "react"
import { cn } from "@/utils/cn"

const Textarea = forwardRef(({ 
  className = "", 
  error = false,
  rows = 4,
  ...props 
}, ref) => {
  return (
    <textarea
      ref={ref}
      rows={rows}
      className={cn(
        "w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-900 placeholder-gray-500 transition-all duration-200 resize-none",
        "focus:border-primary-500 focus:ring-2 focus:ring-primary-100 focus:outline-none",
        "hover:border-gray-300",
        error && "border-danger-500 focus:border-danger-500 focus:ring-danger-100",
        className
      )}
      {...props}
    />
  )
})

Textarea.displayName = "Textarea"

export default Textarea