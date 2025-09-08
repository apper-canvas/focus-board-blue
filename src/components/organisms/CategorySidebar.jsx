import React, { useState } from "react"
import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import CategoryTag from "@/components/molecules/CategoryTag"

const CategorySidebar = ({ 
  categories = [], 
  selectedCategory, 
  onCategorySelect, 
  onAddCategory 
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`bg-white rounded-xl shadow-card transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-full"
      }`}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          {!isCollapsed && (
            <h2 className="text-lg font-semibold text-gray-900">Categories</h2>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 hover:bg-gray-100 rounded-lg lg:hidden"
          >
            <ApperIcon 
              name={isCollapsed ? "ChevronRight" : "ChevronLeft"} 
              size={16} 
            />
          </Button>
        </div>

        {!isCollapsed && (
          <>
            <div className="space-y-2 mb-6">
              <button
                onClick={() => onCategorySelect(null)}
                className={`w-full text-left p-3 rounded-lg transition-all duration-200 flex items-center gap-3 ${
                  selectedCategory === null
                    ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg"
                    : "hover:bg-gray-50 text-gray-700"
                }`}
              >
                <ApperIcon name="Inbox" size={18} />
                <span className="font-medium">All Tasks</span>
                <span className={`ml-auto px-2 py-1 rounded-full text-xs ${
                  selectedCategory === null
                    ? "bg-white/20 text-white"
                    : "bg-gray-100 text-gray-600"
                }`}>
                  {categories.reduce((sum, cat) => sum + cat.taskCount, 0)}
                </span>
              </button>

              {categories.map(category => (
                <button
                  key={category.Id}
                  onClick={() => onCategorySelect(category.Id)}
                  className={`w-full text-left p-3 rounded-lg transition-all duration-200 flex items-center gap-3 ${
                    selectedCategory === category.Id
                      ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg"
                      : "hover:bg-gray-50 text-gray-700"
                  }`}
                >
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                  <span className="font-medium truncate flex-1">{category.name}</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    selectedCategory === category.Id
                      ? "bg-white/20 text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}>
                    {category.taskCount}
                  </span>
                </button>
              ))}
            </div>

            <Button
              onClick={onAddCategory}
              variant="secondary"
              size="sm"
              className="w-full flex items-center justify-center gap-2 border-dashed border-2 hover:border-primary-300 hover:bg-primary-50"
            >
              <ApperIcon name="Plus" size={16} />
              Add Category
            </Button>
          </>
        )}
      </div>
    </motion.div>
  )
}

export default CategorySidebar