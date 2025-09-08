import React, { forwardRef } from "react"
import { cn } from "@/utils/cn"

const Select = forwardRef(({ 
  className = "", 
  children,
  error = false,
  ...props 
}, ref) => {
  return (
    <select
      ref={ref}
      className={cn(
        "w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-900 transition-all duration-200",
        "focus:border-primary-500 focus:ring-2 focus:ring-primary-100 focus:outline-none",
        "hover:border-gray-300",
        error && "border-danger-500 focus:border-danger-500 focus:ring-danger-100",
        className
      )}
      {...props}
    >
      {children}
    </select>
  )
})

Select.displayName = "Select"

export default Select