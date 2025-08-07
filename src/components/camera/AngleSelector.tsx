'use client'

import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

interface AngleSelectorProps {
  selectedAngle: 'heel' | 'arch' | 'forefoot' | null
  onSelectAngle: (angle: 'heel' | 'arch' | 'forefoot') => void
  className?: string
}

export function AngleSelector({ selectedAngle, onSelectAngle, className }: AngleSelectorProps) {
  const angles = [
    {
      id: 'heel' as const,
      label: 'Heel View',
      description: 'Capture the back of the shoe',
      icon: '👟'
    },
    {
      id: 'arch' as const,
      label: 'Arch View', 
      description: 'Capture the side arch area',
      icon: '🦶'
    },
    {
      id: 'forefoot' as const,
      label: 'Forefoot View',
      description: 'Capture the front sole area',
      icon: '👣'
    }
  ]

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Select Capture Angle</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {angles.map((angle) => (
            <Button
              key={angle.id}
              onClick={() => onSelectAngle(angle.id)}
              variant={selectedAngle === angle.id ? 'default' : 'outline'}
              className="h-auto p-4 flex flex-col items-center space-y-2"
            >
              <div className="text-2xl">{angle.icon}</div>
              <div className="text-center">
                <div className="font-medium">{angle.label}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {angle.description}
                </div>
              </div>
            </Button>
          ))}
        </div>
        
        <div className="mt-4 text-sm text-gray-600">
          <p className="font-medium">Capture Tips:</p>
          <ul className="list-disc list-inside mt-1 space-y-1">
            <li>Ensure the shoe is clean and well-lit</li>
            <li>Capture from the recommended angle for best analysis</li>
            <li>Hold the camera steady to avoid blur</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
