'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { PhotoPreview as PhotoPreviewType } from '@/lib/types'

interface PhotoPreviewProps {
  preview: PhotoPreviewType
  onRetake: () => void
  onAccept: () => void
  className?: string
}

export function PhotoPreview({
  preview,
  onRetake,
  onAccept,
  className
}: PhotoPreviewProps) {
  const [isLoading, setIsLoading] = useState(false)

  const angleLabels = {
    heel: 'Heel View',
    arch: 'Arch View',
    forefoot: 'Forefoot View'
  }

  const handleAccept = async () => {
    setIsLoading(true)
    try {
      await onAccept()
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{angleLabels[preview.angle]} Preview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
          {preview.image && (
            <img
              src={preview.image}
              alt={`${angleLabels[preview.angle]} preview`}
              className="w-full h-full object-cover"
            />
          )}
          {!preview.isValid && (
            <div className="absolute inset-0 bg-red-500/20 flex items-center justify-center">
              <div className="text-center text-red-600">
                <div className="text-2xl mb-2">⚠️</div>
                <p className="text-sm font-medium">Invalid Image</p>
              </div>
            </div>
          )}
        </div>

        {preview.errorMessage && (
          <div className="text-red-500 text-sm p-3 bg-red-50 rounded-md">
            {preview.errorMessage}
          </div>
        )}

        {preview.isValid && (
          <div className="text-green-600 text-sm p-3 bg-green-50 rounded-md">
            ✓ Image captured successfully
          </div>
        )}

        <div className="flex gap-2">
          <Button onClick={onRetake} variant="outline" className="flex-1">
            Retake Photo
          </Button>
          <Button
            onClick={handleAccept}
            disabled={!preview.isValid || isLoading}
            isLoading={isLoading}
            className="flex-1"
          >
            {isLoading ? 'Processing...' : 'Use This Photo'}
          </Button>
        </div>

        <div className="text-sm text-gray-600">
          <p className="font-medium">Photo Quality:</p>
          <ul className="list-disc list-inside mt-1 space-y-1">
            <li>Image is clear and well-lit</li>
            <li>Shoe is properly positioned</li>
            <li>No blur or motion artifacts</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
