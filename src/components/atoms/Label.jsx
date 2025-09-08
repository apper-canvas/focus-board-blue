import React, { forwardRef } from "react"
import { cn } from "@/utils/cn"

const Label = forwardRef(({ 
  className = "", 
  children,
  required = false,
  ...props 
}, ref) => {
  return (
    <label
      ref={ref}
      className={cn(
        "block text-sm font-medium text-gray-700 mb-2",
        className
      )}
      {...props}
    >
      {children}
      {required && <span className="text-danger-500 ml-1">*</span>}
    </label>
  )
})

Label.displayName = "Label"

export default Label