'use client'

import { useState } from 'react'
import { CameraCapture } from '@/components/camera/CameraCapture'
import { PhotoPreview } from '@/components/camera/PhotoPreview'
import { AngleSelector } from '@/components/camera/AngleSelector'
import { cameraUtils } from '@/lib/cameraUtils'
import { CameraCapture as CameraCaptureType, PhotoPreview as PhotoPreviewType } from '@/lib/types'

export default function CameraPage() {
  const [selectedAngle, setSelectedAngle] = useState<'heel' | 'arch' | 'forefoot' | null>(null)
  const [captures, setCaptures] = useState<CameraCaptureType[]>([])
  const [currentPreview, setCurrentPreview] = useState<PhotoPreviewType | null>(null)
  const [showPreview, setShowPreview] = useState(false)

  const handleCapture = (capture: CameraCaptureType) => {
    const preview = cameraUtils.createPhotoPreview(capture.image, capture.angle)
    setCurrentPreview(preview)
    setShowPreview(true)
  }

  const handleRetake = () => {
    setShowPreview(false)
    setCurrentPreview(null)
  }

  const handleAccept = () => {
    if (currentPreview && currentPreview.isValid) {
      setCaptures(prev => [...prev, {
        image: currentPreview.image,
        angle: currentPreview.angle,
        timestamp: new Date()
      }])
      setShowPreview(false)
      setCurrentPreview(null)
      setSelectedAngle(null)
    }
  }

  const handleSelectAngle = (angle: 'heel' | 'arch' | 'forefoot') => {
    setSelectedAngle(angle)
    setShowPreview(false)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Capture Shoe Images</h1>
        <p className="text-gray-600">
          Take photos of your shoes from different angles for analysis
        </p>
      </div>

      <div className="space-y-6">
        {/* Angle Selector */}
        {!selectedAngle && !showPreview && (
          <AngleSelector
            selectedAngle={selectedAngle}
            onSelectAngle={handleSelectAngle}
          />
        )}

        {/* Camera Capture */}
        {selectedAngle && !showPreview && (
          <CameraCapture
            angle={selectedAngle}
            onCapture={handleCapture}
          />
        )}

        {/* Photo Preview */}
        {showPreview && currentPreview && (
          <PhotoPreview
            preview={currentPreview}
            onRetake={handleRetake}
            onAccept={handleAccept}
          />
        )}

        {/* Captured Images Summary */}
        {captures.length > 0 && (
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-lg mb-3">Captured Images ({captures.length})</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {captures.map((capture, index) => (
                <div key={index} className="aspect-square bg-white rounded-lg overflow-hidden shadow-sm">
                  <img
                    src={capture.image}
                    alt={`${capture.angle} view`}
                    className="w-full h-full object-cover"
                  />
                  <div className="p-2 text-xs text-center bg-gray-100">
                    {capture.angle.charAt(0).toUpperCase() + capture.angle.slice(1)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between pt-6">
          <button
            onClick={() => window.history.back()}
            className="px-4 py-2 text-gray-600 hover:text-gray-900"
          >
            ← Back
          </button>
          
          {captures.length > 0 && (
            <button
              onClick={() => window.location.href = '/analysis'}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Continue to Analysis →
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
