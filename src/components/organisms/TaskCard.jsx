import React, { useState } from "react"
import { motion } from "framer-motion"
import { format, isToday, isTomorrow, isPast } from "date-fns"
import { toast } from "react-toastify"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import Checkbox from "@/components/atoms/Checkbox"
import Badge from "@/components/atoms/Badge"
import CategoryTag from "@/components/molecules/CategoryTag"
import taskService from "@/services/api/taskService"
import categoryService from "@/services/api/categoryService"

const TaskCard = ({ task, categories = [], onTaskUpdate, onTaskDelete }) => {
  const [loading, setLoading] = useState(false)
  const [completed, setCompleted] = useState(task.completed)

  const category = categories.find(cat => cat.Id === task.categoryId)

  const formatDueDate = (dateString) => {
    const date = new Date(dateString)
    if (isToday(date)) return "Today"
    if (isTomorrow(date)) return "Tomorrow"
    return format(date, "MMM d")
  }

  const getDueDateColor = (dateString) => {
    const date = new Date(dateString)
    if (isPast(date) && !isToday(date)) return "text-danger-500"
    if (isToday(date)) return "text-accent-500"
    return "text-gray-500"
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high": return "task-priority-high"
      case "medium": return "task-priority-medium"
      case "low": return "task-priority-low"
      default: return "task-priority-low"
    }
  }

  const handleToggleComplete = async () => {
    setLoading(true)
    try {
      const newCompletedState = !completed
      const updatedTask = await taskService.updateTask(task.Id, { 
        completed: newCompletedState 
      })
      
      setCompleted(newCompletedState)
      onTaskUpdate && onTaskUpdate(updatedTask)
      
      if (newCompletedState) {
        toast.success("Task completed! Great work! 🎉", {
          icon: "✅"
        })
      } else {
        toast.info("Task marked as incomplete")
      }
    } catch (error) {
      toast.error("Failed to update task")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this task?")) {
      return
    }

    setLoading(true)
    try {
      await taskService.deleteTask(task.Id)
      if (task.categoryId) {
        await categoryService.updateTaskCount(task.categoryId, false)
      }
      onTaskDelete && onTaskDelete(task.Id)
      toast.success("Task deleted successfully")
    } catch (error) {
      toast.error("Failed to delete task")
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      whileHover={{ y: -2, shadow: "0 8px 25px rgba(0,0,0,0.15)" }}
      className={`
        bg-white rounded-xl shadow-card hover:shadow-card-hover transition-all duration-200
        ${getPriorityColor(task.priority)} ${completed ? "task-completed" : ""}
        animate-slide-in
      `}
    >
      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className="mt-1">
            <Checkbox
              checked={completed}
              onChange={handleToggleComplete}
              disabled={loading}
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-3">
              <h3 className={`text-lg font-semibold leading-6 task-title ${
                completed ? "line-through text-gray-500" : "text-gray-900"
              }`}>
                {task.title}
              </h3>
              
              <div className="flex items-center gap-2 ml-4">
                <Badge variant={task.priority}>
                  {task.priority}
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDelete}
                  disabled={loading}
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-red-50 hover:text-red-600"
                >
                  <ApperIcon name="Trash2" size={16} />
                </Button>
              </div>
            </div>

            {task.description && (
              <p className={`text-sm mb-4 leading-relaxed ${
                completed ? "text-gray-400" : "text-gray-600"
              }`}>
                {task.description}
              </p>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {category && (
                  <CategoryTag category={category} size="sm" />
                )}
                
                <div className="flex items-center gap-1.5">
                  <ApperIcon 
                    name="Calendar" 
                    size={14} 
                    className={getDueDateColor(task.dueDate)} 
                  />
                  <span className={`text-sm font-medium ${getDueDateColor(task.dueDate)}`}>
                    {formatDueDate(task.dueDate)}
                  </span>
                </div>
              </div>

              {completed && task.completedAt && (
                <div className="flex items-center gap-1.5">
                  <ApperIcon name="CheckCircle" size={14} className="text-success-500" />
                  <span className="text-xs text-success-600 font-medium">
                    Completed {format(new Date(task.completedAt), "MMM d")}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default TaskCard