import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { toast } from "react-toastify"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import FormField from "@/components/molecules/FormField"
import taskService from "@/services/api/taskService"
import categoryService from "@/services/api/categoryService"
import { format } from "date-fns"
const TaskForm = ({ onTaskCreated, onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    dueDate: format(new Date(), "yyyy-MM-dd"),
    categoryId: ""
  })
  const [categories, setCategories] = useState([])
const [loading, setLoading] = useState(false)
  const [aiLoading, setAiLoading] = useState(false)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = async () => {
    try {
      const categoryData = await categoryService.getAllCategories()
      setCategories(categoryData)
      if (categoryData.length > 0 && !formData.categoryId) {
        setFormData(prev => ({ ...prev, categoryId: categoryData[0].Id }))
      }
    } catch (error) {
      console.error("Error loading categories:", error)
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = "Task title is required"
    }

    if (!formData.categoryId) {
      newErrors.categoryId = "Please select a category"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setLoading(true)
    try {
      const newTask = await taskService.createTask(formData)
      await categoryService.updateTaskCount(formData.categoryId, true)
      
      toast.success("Task created successfully!", {
        icon: "✅"
      })
      
      onTaskCreated && onTaskCreated(newTask)
      onClose && onClose()
    } catch (error) {
      toast.error("Failed to create task. Please try again.")
    } finally {
      setLoading(false)
    }
  }

const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  const handleGenerateDescription = async () => {
    if (!formData.title.trim()) {
      toast.error("Please enter a task title first")
      return
    }

    setAiLoading(true)
    try {
      const description = await taskService.generateDescription(formData.title)
      setFormData(prev => ({ ...prev, description }))
      toast.success("Description generated successfully!")
    } catch (error) {
      toast.error(error.message || "Failed to generate description")
    } finally {
      setAiLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600">
            <ApperIcon name="Plus" size={20} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Add New Task</h2>
        </div>
        {onClose && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ApperIcon name="X" size={20} />
          </Button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <FormField
          label="Task Title"
          type="input"
          required
          value={formData.title}
          onChange={(e) => handleInputChange("title", e.target.value)}
          placeholder="Enter task title..."
          error={errors.title}
        />

<div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleGenerateDescription}
              disabled={aiLoading || !formData.title.trim()}
              className="text-xs text-primary-600 hover:text-primary-700 disabled:opacity-50"
            >
              {aiLoading ? (
                <>
                  <ApperIcon name="Loader2" size={12} className="mr-1 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <ApperIcon name="Sparkles" size={12} className="mr-1" />
                  Generate with AI
                </>
              )}
            </Button>
          </div>
          <FormField
            type="textarea"
            rows={3}
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            placeholder="Add more details about this task or click 'Generate with AI'..."
            disabled={aiLoading}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            label="Priority"
            type="select"
            value={formData.priority}
            onChange={(e) => handleInputChange("priority", e.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </FormField>

          <FormField
            label="Due Date"
            type="date"
            value={formData.dueDate}
            onChange={(e) => handleInputChange("dueDate", e.target.value)}
          />
        </div>

        <FormField
          label="Category"
          type="select"
          required
          value={formData.categoryId}
          onChange={(e) => handleInputChange("categoryId", e.target.value)}
          error={errors.categoryId}
        >
          <option value="">Select category...</option>
          {categories.map(category => (
            <option key={category.Id} value={category.Id}>
              {category.name}
            </option>
          ))}
        </FormField>

        <div className="flex gap-3 pt-4">
          <Button
            type="submit"
            disabled={loading}
            className="flex-1 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700"
          >
            {loading ? (
              <>
                <ApperIcon name="Loader2" size={16} className="animate-spin mr-2" />
                Creating...
              </>
            ) : (
              <>
                <ApperIcon name="Plus" size={16} className="mr-2" />
                Add Task
              </>
            )}
          </Button>
          
          {onClose && (
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              disabled={loading}
              className="px-6"
            >
              Cancel
            </Button>
          )}
        </div>
      </form>
    </motion.div>
  )
}

export default TaskForm