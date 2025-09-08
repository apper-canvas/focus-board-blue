import React from "react"
import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"

const StatsHeader = ({ stats = {} }) => {
  const statCards = [
    {
      title: "Total Tasks",
      value: stats.total || 0,
      icon: "List",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600"
    },
    {
      title: "Active Tasks",
      value: stats.active || 0,
      icon: "Circle",
      color: "from-amber-500 to-amber-600",
      bgColor: "bg-amber-50",
      iconColor: "text-amber-600"
    },
    {
      title: "Completed",
      value: stats.completed || 0,
      icon: "CheckCircle",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      iconColor: "text-green-600"
    },
    {
      title: "High Priority",
      value: stats.highPriority || 0,
      icon: "AlertCircle",
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-50",
      iconColor: "text-red-600"
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
    >
      {statCards.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-xl shadow-card hover:shadow-card-hover transition-all duration-200 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">
                {stat.title}
              </p>
              <p className="text-3xl font-bold text-gray-900">
                {stat.value}
              </p>
            </div>
            <div className={`p-3 rounded-xl ${stat.bgColor}`}>
              <ApperIcon 
                name={stat.icon} 
                size={24} 
                className={stat.iconColor} 
              />
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}

export default StatsHeader