import React from "react"
import { motion } from "framer-motion"
import FilterButton from "@/components/molecules/FilterButton"
import SearchBar from "@/components/molecules/SearchBar"

const TaskFilter = ({ 
  activeFilters, 
  onFilterChange, 
  searchQuery, 
  onSearchChange,
  taskCounts = {}
}) => {
  const statusFilters = [
    { key: "all", label: "All Tasks", icon: "List", count: taskCounts.all },
    { key: "active", label: "Active", icon: "Circle", count: taskCounts.active },
    { key: "completed", label: "Completed", icon: "CheckCircle", count: taskCounts.completed }
  ]

  const priorityFilters = [
    { key: "high", label: "High Priority", icon: "AlertCircle", count: taskCounts.high },
    { key: "medium", label: "Medium", icon: "Clock", count: taskCounts.medium },
    { key: "low", label: "Low", icon: "Minus", count: taskCounts.low }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-card p-6 space-y-6"
    >
      <SearchBar
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search tasks by title or description..."
        className="w-full"
      />

      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
            Status
          </h3>
          <div className="flex flex-wrap gap-2">
            {statusFilters.map(filter => (
              <FilterButton
                key={filter.key}
                active={activeFilters.status === filter.key}
                onClick={() => onFilterChange("status", filter.key)}
                icon={filter.icon}
                count={filter.count}
              >
                {filter.label}
              </FilterButton>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
            Priority
          </h3>
          <div className="flex flex-wrap gap-2">
            <FilterButton
              active={!activeFilters.priority}
              onClick={() => onFilterChange("priority", null)}
              icon="Filter"
            >
              All Priorities
            </FilterButton>
            {priorityFilters.map(filter => (
              <FilterButton
                key={filter.key}
                active={activeFilters.priority === filter.key}
                onClick={() => onFilterChange("priority", filter.key)}
                icon={filter.icon}
                count={filter.count}
              >
                {filter.label}
              </FilterButton>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default TaskFilter