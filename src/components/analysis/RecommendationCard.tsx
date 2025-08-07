'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

interface RecommendationCardProps {
  title: string
  description: string
  priority: 'high' | 'medium' | 'low'
  action?: {
    label: string
    onClick: () => void
  }
  className?: string
}

export function RecommendationCard({ 
  title, 
  description, 
  priority, 
  action, 
  className 
}: RecommendationCardProps) {
  const priorityColors = {
    high: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-800',
      badge: 'bg-red-100 text-red-800'
    },
    medium: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200', 
      text: 'text-yellow-800',
      badge: 'bg-yellow-100 text-yellow-800'
    },
    low: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-800', 
      badge: 'bg-green-100 text-green-800'
    }
  }

  const colors = priorityColors[priority]

  return (
    <Card className={`${colors.bg} ${colors.border} ${className}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className={`text-lg ${colors.text}`}>
            {title}
          </CardTitle>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors.badge}`}>
            {priority.charAt(0).toUpperCase() + priority.slice(1)} Priority
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-gray-700">
          {description}
        </p>
        
        {action && (
          <Button
            onClick={action.onClick}
            variant="outline"
            size="sm"
            className="w-full"
          >
            {action.label}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
