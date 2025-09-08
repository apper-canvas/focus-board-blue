import { useState, useEffect, useCallback } from "react"
import taskService from "@/services/api/taskService"

export const useTasks = () => {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const loadTasks = useCallback(async () => {
    setLoading(true)
    setError(null)
    
    try {
      const taskData = await taskService.getAllTasks()
      setTasks(taskData)
    } catch (err) {
      setError("Failed to load tasks. Please try again.")
      console.error("Error loading tasks:", err)
    } finally {
      setLoading(false)
    }
  }, [])

  const createTask = useCallback(async (taskData) => {
    try {
      const newTask = await taskService.createTask(taskData)
      setTasks(prev => [...prev, newTask])
      return newTask
    } catch (err) {
      throw new Error("Failed to create task")
    }
  }, [])

  const updateTask = useCallback(async (taskId, updates) => {
    try {
      const updatedTask = await taskService.updateTask(taskId, updates)
      setTasks(prev => prev.map(task => 
        task.Id === taskId ? updatedTask : task
      ))
      return updatedTask
    } catch (err) {
      throw new Error("Failed to update task")
    }
  }, [])

  const deleteTask = useCallback(async (taskId) => {
    try {
      await taskService.deleteTask(taskId)
      setTasks(prev => prev.filter(task => task.Id !== taskId))
    } catch (err) {
      throw new Error("Failed to delete task")
    }
  }, [])

  useEffect(() => {
    loadTasks()
  }, [loadTasks])

  return {
    tasks,
    loading,
    error,
    loadTasks,
    createTask,
    updateTask,
    deleteTask
  }
}