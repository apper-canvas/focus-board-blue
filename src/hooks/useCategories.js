import { useState, useEffect, useCallback } from "react"
import categoryService from "@/services/api/categoryService"

export const useCategories = () => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const loadCategories = useCallback(async () => {
    setLoading(true)
    setError(null)
    
    try {
      const categoryData = await categoryService.getAllCategories()
      setCategories(categoryData)
    } catch (err) {
      setError("Failed to load categories. Please try again.")
      console.error("Error loading categories:", err)
    } finally {
      setLoading(false)
    }
  }, [])

  const createCategory = useCallback(async (categoryData) => {
    try {
      const newCategory = await categoryService.createCategory(categoryData)
      setCategories(prev => [...prev, newCategory])
      return newCategory
    } catch (err) {
      throw new Error("Failed to create category")
    }
  }, [])

  const updateCategory = useCallback(async (categoryId, updates) => {
    try {
      const updatedCategory = await categoryService.updateCategory(categoryId, updates)
      setCategories(prev => prev.map(category => 
        category.Id === categoryId ? updatedCategory : category
      ))
      return updatedCategory
    } catch (err) {
      throw new Error("Failed to update category")
    }
  }, [])

  const deleteCategory = useCallback(async (categoryId) => {
    try {
      await categoryService.deleteCategory(categoryId)
      setCategories(prev => prev.filter(category => category.Id !== categoryId))
    } catch (err) {
      throw new Error("Failed to delete category")
    }
  }, [])

  useEffect(() => {
    loadCategories()
  }, [loadCategories])

  return {
    categories,
    loading,
    error,
    loadCategories,
    createCategory,
    updateCategory,
    deleteCategory
  }
}