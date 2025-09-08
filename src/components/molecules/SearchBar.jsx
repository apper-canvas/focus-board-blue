import React from "react"
import ApperIcon from "@/components/ApperIcon"
import Input from "@/components/atoms/Input"

const SearchBar = ({ 
  value, 
  onChange, 
  placeholder = "Search tasks...", 
  className = "" 
}) => {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <ApperIcon 
          name="Search" 
          size={20} 
          className="text-gray-400" 
        />
      </div>
      <Input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="pl-12 bg-white border-gray-200 focus:border-primary-500"
      />
    </div>
  )
}

export default SearchBar