import React from "react";
import Error from "@/components/ui/Error";
import taskService from "@/services/mockData/categories.json";
import tasksMockData from "@/services/mockData/tasks.json";

class TaskService {
  constructor() {
    this.tasks = [...tasksMockData]
    this.loadTasksFromStorage()
  }

  loadTasksFromStorage() {
    try {
      const storedTasks = localStorage.getItem("focusboard_tasks")
      if (storedTasks) {
        this.tasks = JSON.parse(storedTasks)
      }
    } catch (error) {
      console.error("Error loading tasks from localStorage:", error)
    }
  }

  saveTasksToStorage() {
    try {
      localStorage.setItem("focusboard_tasks", JSON.stringify(this.tasks))
    } catch (error) {
      console.error("Error saving tasks to localStorage:", error)
    }
  }

  async getAllTasks() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...this.tasks])
      }, 200)
    })
  }

  async getTaskById(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const task = this.tasks.find(task => task.Id === parseInt(id))
        resolve(task ? { ...task } : null)
      }, 100)
    })
  }

  async createTask(taskData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const maxId = Math.max(...this.tasks.map(task => task.Id), 0)
        const newTask = {
          Id: maxId + 1,
          ...taskData,
          completed: false,
          createdAt: new Date().toISOString(),
          completedAt: null
        }
        this.tasks.push(newTask)
        this.saveTasksToStorage()
        resolve({ ...newTask })
      }, 300)
    })
  }

  async updateTask(id, taskData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = this.tasks.findIndex(task => task.Id === parseInt(id))
        if (index !== -1) {
          this.tasks[index] = { ...this.tasks[index], ...taskData }
          if (taskData.completed === true && !this.tasks[index].completedAt) {
            this.tasks[index].completedAt = new Date().toISOString()
          } else if (taskData.completed === false) {
            this.tasks[index].completedAt = null
          }
          this.saveTasksToStorage()
          resolve({ ...this.tasks[index] })
        } else {
          resolve(null)
        }
      }, 250)
    })
  }

  async deleteTask(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = this.tasks.findIndex(task => task.Id === parseInt(id))
        if (index !== -1) {
          const deletedTask = this.tasks.splice(index, 1)[0]
          this.saveTasksToStorage()
          resolve({ ...deletedTask })
        } else {
          resolve(null)
        }
      }, 200)
    })
  }

  async getTasksByCategory(categoryId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filteredTasks = this.tasks.filter(task => task.categoryId === categoryId)
        resolve(filteredTasks.map(task => ({ ...task })))
      }, 150)
    })
  }

  async getTasksByPriority(priority) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filteredTasks = this.tasks.filter(task => task.priority === priority)
        resolve(filteredTasks.map(task => ({ ...task })))
      }, 150)
    })
  }

async searchTasks(searchTerm) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const searchResults = this.tasks.filter(task => 
          task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
        resolve(searchResults.map(task => ({ ...task })))
      }, 200)
    })
  }

  async generateDescription(title) {
    try {
      const response = await fetch(`https://test-api.apper.io/fn/${import.meta.env.VITE_GENERATE_TASK_DESCRIPTION}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title })
      })

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate description')
      }

      if (!data.success) {
        throw new Error(data.error || 'Failed to generate description')
      }

      return data.description
    } catch (error) {
      console.error('Error generating description:', error)
      throw new Error(error.message || 'Failed to generate description. Please try again.')
    }
  }
}

const taskService = new TaskService()
export default taskService