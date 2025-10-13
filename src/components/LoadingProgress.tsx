"use client"

import { useState, useEffect } from "react"
import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"

interface LoadingProgressProps {
  duration?: number
  onComplete?: () => void
  className?: string
}

export function LoadingProgress({ 
  duration = 3000, 
  onComplete, 
  className 
}: LoadingProgressProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(timer)
          onComplete?.()
          return 100
        }
        return prevProgress + 1
      })
    }, duration / 100)

    return () => clearInterval(timer)
  }, [duration, onComplete])

  return (
    <motion.div 
      className={`w-full space-y-3 ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      <div className="relative">
        <Progress 
          value={progress} 
          className="w-full h-2 transition-smooth" 
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/40 rounded-full"
          style={{ width: `${progress}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </div>
      <motion.div 
        className="text-sm text-muted-foreground text-center font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        Loading... {Math.round(progress)}%
      </motion.div>
    </motion.div>
  )
} 