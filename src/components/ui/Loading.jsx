import React from "react"

const Loading = ({ variant = "default", className = "" }) => {
  if (variant === "skeleton") {
    return (
      <div className={`animate-pulse space-y-4 ${className}`}>
        <div className="bg-white rounded-lg p-6 shadow-card space-y-3">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          <div className="flex justify-between items-center">
            <div className="h-3 bg-gray-200 rounded w-20"></div>
            <div className="h-8 bg-gray-200 rounded w-16"></div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-card space-y-3">
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          <div className="h-3 bg-gray-200 rounded w-3/4"></div>
          <div className="flex justify-between items-center">
            <div className="h-3 bg-gray-200 rounded w-20"></div>
            <div className="h-8 bg-gray-200 rounded w-16"></div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-card space-y-3">
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-3 bg-gray-200 rounded w-2/3"></div>
          <div className="flex justify-between items-center">
            <div className="h-3 bg-gray-200 rounded w-20"></div>
            <div className="h-8 bg-gray-200 rounded w-16"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`flex items-center justify-center p-8 ${className}`}>
      <div className="flex space-x-2">
        <div className="w-3 h-3 bg-primary-500 rounded-full animate-bounce"></div>
        <div className="w-3 h-3 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
        <div className="w-3 h-3 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
      </div>
    </div>
  )
}

export default Loading