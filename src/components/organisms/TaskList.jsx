import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import TaskCard from "@/components/organisms/TaskCard"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import Empty from "@/components/ui/Empty"

const TaskList = ({ 
  tasks = [], 
  categories = [], 
  loading = false, 
  error = null, 
  onTaskUpdate, 
  onTaskDelete, 
  onAddTask,
  emptyMessage = "No tasks found",
  emptyIcon = "CheckSquare"
}) => {
  if (loading) {
    return <Loading variant="skeleton" />
  }

  if (error) {
    return (
      <Error 
        message={error} 
        onRetry={() => window.location.reload()} 
      />
    )
  }

  if (!tasks.length) {
    return (
      <Empty
        title="No tasks yet"
        message={emptyMessage}
        actionText="Add Your First Task"
        onAction={onAddTask}
        icon={emptyIcon}
      />
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      <AnimatePresence mode="popLayout">
        {tasks.map(task => (
          <TaskCard
            key={task.Id}
            task={task}
            categories={categories}
            onTaskUpdate={onTaskUpdate}
            onTaskDelete={onTaskDelete}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  )
}

export default TaskList