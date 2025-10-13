import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { format } from "date-fns"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Date formatting utilities
export const formatDate = {
  // Format as dd-MMM-yyyy (e.g., "15-Jan-2024")
  full: (date: Date | string) => format(new Date(date), 'dd-MMM-yyyy'),
  
  // Format as yyyy (e.g., "2024")
  year: (date: Date | string) => format(new Date(date), 'yyyy'),
  
  // Format as MMM yyyy (e.g., "Jan 2024")
  monthYear: (date: Date | string) => format(new Date(date), 'MMM yyyy'),
  
  // Format as dd/MM/yyyy (e.g., "15/01/2024")
  short: (date: Date | string) => format(new Date(date), 'dd/MM/yyyy'),
  
  // Format as relative time (e.g., "2 days ago")
  relative: (date: Date | string) => {
    const now = new Date()
    const targetDate = new Date(date)
    const diffInDays = Math.floor((now.getTime() - targetDate.getTime()) / (1000 * 60 * 60 * 24))
    
    if (diffInDays === 0) return 'Today'
    if (diffInDays === 1) return 'Yesterday'
    if (diffInDays < 7) return `${diffInDays} days ago`
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`
    return `${Math.floor(diffInDays / 365)} years ago`
  }
}
