import React from "react"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"

const Empty = ({ 
  title = "No tasks yet", 
  message = "Create your first task to get started with organizing your work.",
  actionText = "Add Task",
  onAction,
  icon = "CheckSquare",
  className = "" 
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-12 text-center ${className}`}>
      <div className="mb-6 p-4 rounded-full bg-gradient-to-br from-primary-50 to-primary-100">
        <ApperIcon 
          name={icon} 
          size={48} 
          className="text-primary-500" 
        />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-3">
        {title}
      </h3>
      <p className="text-gray-600 mb-8 max-w-md leading-relaxed">
        {message}
      </p>
      {onAction && (
        <Button 
          onClick={onAction}
          size="lg"
          className="flex items-center gap-2 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
        >
          <ApperIcon name="Plus" size={20} />
          {actionText}
        </Button>
      )}
    </div>
  )
}

export default Empty