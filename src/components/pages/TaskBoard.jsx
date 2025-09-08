import React, { useState } from "react"
import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import TaskForm from "@/components/organisms/TaskForm"
import TaskList from "@/components/organisms/TaskList"
import TaskFilter from "@/components/organisms/TaskFilter"
import CategorySidebar from "@/components/organisms/CategorySidebar"
import StatsHeader from "@/components/organisms/StatsHeader"
import { useTasks } from "@/hooks/useTasks"
import { useCategories } from "@/hooks/useCategories"
import { useTaskFilters } from "@/hooks/useTaskFilters"

const TaskBoard = () => {
  const [showTaskForm, setShowTaskForm] = useState(false)
  const [showMobileSidebar, setShowMobileSidebar] = useState(false)

  const { 
    tasks, 
    loading: tasksLoading, 
    error: tasksError, 
    updateTask, 
    deleteTask 
  } = useTasks()

  const { 
    categories, 
    loading: categoriesLoading 
  } = useCategories()

  const {
    filters,
    searchQuery,
    filteredTasks,
    taskCounts,
    taskStats,
    setSearchQuery,
    updateFilter
  } = useTaskFilters(tasks)

  const handleTaskCreated = () => {
    setShowTaskForm(false)
    window.location.reload() // Refresh to show updated data
  }

  const handleTaskUpdate = (updatedTask) => {
    updateTask(updatedTask.Id, updatedTask)
  }

  const handleTaskDelete = (taskId) => {
    deleteTask(taskId)
  }

  const handleCategorySelect = (categoryId) => {
    updateFilter("category", categoryId)
    setShowMobileSidebar(false)
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowMobileSidebar(!showMobileSidebar)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ApperIcon name="Menu" size={20} className="text-gray-600" />
              </button>
              
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600">
                  <ApperIcon name="CheckSquare" size={24} className="text-white" />
                </div>
                <div>
<h1 className="text-2xl font-bold text-gray-900">Focus Board Pro</h1>
                  <p className="text-sm text-gray-600">Organize your tasks efficiently</p>
                </div>
              </div>
            </div>

            <Button
              onClick={() => setShowTaskForm(true)}
              className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <ApperIcon name="Plus" size={16} className="mr-2" />
              Add Task
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      {showMobileSidebar && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowMobileSidebar(false)}
          />
          <div className="absolute left-0 top-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300">
            <div className="p-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Categories</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowMobileSidebar(false)}
                  className="p-2"
                >
                  <ApperIcon name="X" size={16} />
                </Button>
              </div>
              <CategorySidebar
                categories={categories}
                selectedCategory={filters.category}
                onCategorySelect={handleCategorySelect}
                onAddCategory={() => {}}
              />
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Header */}
        <StatsHeader stats={taskStats} />

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <CategorySidebar
              categories={categories}
              selectedCategory={filters.category}
              onCategorySelect={handleCategorySelect}
              onAddCategory={() => {}}
            />
          </div>

          {/* Main Content Area */}
          <div className="flex-1 space-y-6">
            {/* Filters */}
            <TaskFilter
              activeFilters={filters}
              onFilterChange={updateFilter}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              taskCounts={taskCounts}
            />

            {/* Task List */}
            <TaskList
              tasks={filteredTasks}
              categories={categories}
              loading={tasksLoading}
              error={tasksError}
              onTaskUpdate={handleTaskUpdate}
              onTaskDelete={handleTaskDelete}
              onAddTask={() => setShowTaskForm(true)}
              emptyMessage={
                searchQuery 
                  ? `No tasks found matching "${searchQuery}"`
                  : filters.status === "completed"
                    ? "No completed tasks yet. Complete some tasks to see them here!"
                    : filters.status === "active"
                      ? "No active tasks. You're all caught up! 🎉"
                      : "Create your first task to get started with organizing your work."
              }
            />
          </div>
        </div>
      </main>

      {/* Task Form Modal */}
      {showTaskForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowTaskForm(false)}
          />
          <div className="relative z-10">
            <TaskForm
              onTaskCreated={handleTaskCreated}
              onClose={() => setShowTaskForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default TaskBoard