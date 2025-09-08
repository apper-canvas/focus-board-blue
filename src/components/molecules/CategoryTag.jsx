import React from "react"
import { cn } from "@/utils/cn"

const CategoryTag = ({ 
  category, 
  size = "md",
  className = "" 
}) => {
  const sizes = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm"
  }

  if (!category) return null

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-medium border",
        sizes[size],
        className
      )}
      style={{
        backgroundColor: `${category.color}15`,
        borderColor: `${category.color}40`,
        color: category.color
      }}
    >
      {category.name}
    </span>
  )
}

export default CategoryTag