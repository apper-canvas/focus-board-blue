import { useState, useMemo } from "react"

export const useTaskFilters = (tasks = []) => {
  const [filters, setFilters] = useState({
    status: "all",
    priority: null,
    category: null
  })
  const [searchQuery, setSearchQuery] = useState("")

  const filteredTasks = useMemo(() => {
    let filtered = [...tasks]

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query)
      )
    }

    // Filter by status
    if (filters.status === "active") {
      filtered = filtered.filter(task => !task.completed)
    } else if (filters.status === "completed") {
      filtered = filtered.filter(task => task.completed)
    }

    // Filter by priority
    if (filters.priority) {
      filtered = filtered.filter(task => task.priority === filters.priority)
    }

    // Filter by category
    if (filters.category) {
      filtered = filtered.filter(task => task.categoryId === filters.category)
    }

    return filtered
  }, [tasks, filters, searchQuery])

  const taskCounts = useMemo(() => {
    const counts = {
      all: tasks.length,
      active: tasks.filter(task => !task.completed).length,
      completed: tasks.filter(task => task.completed).length,
      high: tasks.filter(task => task.priority === "high").length,
      medium: tasks.filter(task => task.priority === "medium").length,
      low: tasks.filter(task => task.priority === "low").length
    }
    return counts
  }, [tasks])

  const taskStats = useMemo(() => {
    return {
      total: tasks.length,
      active: tasks.filter(task => !task.completed).length,
      completed: tasks.filter(task => task.completed).length,
      highPriority: tasks.filter(task => task.priority === "high" && !task.completed).length
    }
  }, [tasks])

  const updateFilter = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType] === value ? null : value
    }))
  }

  return {
    filters,
    searchQuery,
    filteredTasks,
    taskCounts,
    taskStats,
    setSearchQuery,
    updateFilter,
    setFilters
  }
}