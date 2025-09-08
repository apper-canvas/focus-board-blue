import React, { forwardRef } from "react"
import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"

const Checkbox = forwardRef(({ 
  className = "", 
  checked = false,
  onChange,
  disabled = false,
  ...props 
}, ref) => {
  return (
    <div className="relative flex items-center">
      <input
        type="checkbox"
        ref={ref}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="sr-only"
        {...props}
      />
      <div
        onClick={() => !disabled && onChange && onChange({ target: { checked: !checked } })}
        className={cn(
          "w-5 h-5 rounded border-2 flex items-center justify-center cursor-pointer transition-all duration-200",
          checked 
            ? "bg-gradient-to-br from-primary-500 to-primary-600 border-primary-500 shadow-lg" 
            : "bg-white border-gray-300 hover:border-primary-300",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
      >
        {checked && (
          <ApperIcon 
            name="Check" 
            size={12} 
            className="text-white animate-scale-in" 
          />
        )}
      </div>
    </div>
  )
})

Checkbox.displayName = "Checkbox"

export default Checkbox