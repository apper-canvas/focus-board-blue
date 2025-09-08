import React from "react"
import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"

const FilterButton = ({ 
  children, 
  active = false, 
  onClick, 
  icon,
  count,
  className = "" 
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-102",
        active 
          ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg" 
          : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:border-gray-300 shadow-sm hover:shadow-md",
        className
      )}
    >
      {icon && (
        <ApperIcon 
          name={icon} 
          size={16} 
          className={active ? "text-white" : "text-gray-500"} 
        />
      )}
      {children}
      {count !== undefined && (
        <span className={cn(
          "ml-1 px-2 py-0.5 rounded-full text-xs font-semibold",
          active ? "bg-white/20 text-white" : "bg-gray-100 text-gray-600"
        )}>
          {count}
        </span>
      )}
    </button>
  )
}

export default FilterButton