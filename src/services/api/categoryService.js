import categoriesMockData from "@/services/mockData/categories.json"

class CategoryService {
  constructor() {
    this.categories = [...categoriesMockData]
    this.loadCategoriesFromStorage()
  }

  loadCategoriesFromStorage() {
    try {
      const storedCategories = localStorage.getItem("focusboard_categories")
      if (storedCategories) {
        this.categories = JSON.parse(storedCategories)
      }
    } catch (error) {
      console.error("Error loading categories from localStorage:", error)
    }
  }

  saveCategoriesToStorage() {
    try {
      localStorage.setItem("focusboard_categories", JSON.stringify(this.categories))
    } catch (error) {
      console.error("Error saving categories to localStorage:", error)
    }
  }

  async getAllCategories() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...this.categories])
      }, 150)
    })
  }

  async getCategoryById(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const category = this.categories.find(category => category.Id === id)
        resolve(category ? { ...category } : null)
      }, 100)
    })
  }

  async createCategory(categoryData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const maxId = Math.max(...this.categories.map(cat => parseInt(cat.Id)), 0)
        const newCategory = {
          Id: (maxId + 1).toString(),
          ...categoryData,
          taskCount: 0
        }
        this.categories.push(newCategory)
        this.saveCategoriesToStorage()
        resolve({ ...newCategory })
      }, 250)
    })
  }

  async updateCategory(id, categoryData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = this.categories.findIndex(category => category.Id === id)
        if (index !== -1) {
          this.categories[index] = { ...this.categories[index], ...categoryData }
          this.saveCategoriesToStorage()
          resolve({ ...this.categories[index] })
        } else {
          resolve(null)
        }
      }, 200)
    })
  }

  async deleteCategory(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = this.categories.findIndex(category => category.Id === id)
        if (index !== -1) {
          const deletedCategory = this.categories.splice(index, 1)[0]
          this.saveCategoriesToStorage()
          resolve({ ...deletedCategory })
        } else {
          resolve(null)
        }
      }, 200)
    })
  }

  async updateTaskCount(categoryId, increment = true) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = this.categories.findIndex(category => category.Id === categoryId)
        if (index !== -1) {
          this.categories[index].taskCount += increment ? 1 : -1
          this.categories[index].taskCount = Math.max(0, this.categories[index].taskCount)
          this.saveCategoriesToStorage()
          resolve({ ...this.categories[index] })
        } else {
          resolve(null)
        }
      }, 100)
    })
  }
}

const categoryService = new CategoryService()
export default categoryService