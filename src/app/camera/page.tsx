'use client'

import { useState, useRef, useCallback } from 'react'
import { PhotoPreview } from '@/components/camera/PhotoPreview'
import { AngleSelector } from '@/components/camera/AngleSelector'
import { cameraUtils } from '@/lib/cameraUtils'
import {
  CameraCapture as CameraCaptureType,
  PhotoPreview as PhotoPreviewType
} from '@/lib/types'

export default function CameraPage() {
  const [selectedAngle, setSelectedAngle] = useState<
    'heel' | 'arch' | 'forefoot' | null
  >(null)
  const [captures, setCaptures] = useState<CameraCaptureType[]>([])
  const [currentPreview, setCurrentPreview] = useState<PhotoPreviewType | null>(
    null
  )
  const [showPreview, setShowPreview] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (file && selectedAngle) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const imageSrc = e.target?.result as string
          if (imageSrc) {
            const preview = cameraUtils.createPhotoPreview(
              imageSrc,
              selectedAngle
            )
            setCurrentPreview(preview)
            setShowPreview(true)
          }
        }
        reader.readAsDataURL(file)
      }
      // Reset the input so the same file can be selected again
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    },
    [selectedAngle]
  )

  const handleRetake = () => {
    setShowPreview(false)
    setCurrentPreview(null)
  }

  const handleAccept = () => {
    if (currentPreview && currentPreview.isValid && selectedAngle) {
      setCaptures((prev) => [
        ...prev,
        {
          image: currentPreview.image,
          angle: currentPreview.angle,
          timestamp: new Date()
        }
      ])
      setShowPreview(false)
      setCurrentPreview(null)
      setSelectedAngle(null)
    }
  }

  const handleSelectAngle = (angle: 'heel' | 'arch' | 'forefoot') => {
    setSelectedAngle(angle)
    setShowPreview(false)
  }

  const openCamera = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  return (
    <div className="container max-w-4xl px-4 py-8 mx-auto">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">
          Capture Shoe Images
        </h1>
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
          <div className="relative w-full overflow-hidden bg-gray-200 rounded-lg h-96">
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-16 h-16 mx-auto text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.218A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.218A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-700">
                Ready to capture {selectedAngle} view
              </h3>
              <p className="mb-6 text-gray-500">
                Tap the button below to open your camera
              </p>
              <button
                onClick={openCamera}
                className="px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Open Camera
              </button>
            </div>

            {/* Hidden file input for camera capture */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
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
          <div className="p-4 rounded-lg bg-gray-50">
            <h3 className="mb-3 text-lg font-semibold">
              Captured Images ({captures.length})
            </h3>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
              {captures.map((capture, index) => (
                <div
                  key={index}
                  className="overflow-hidden bg-white rounded-lg shadow-sm aspect-square"
                >
                  {capture.image && (
                    <img
                      src={capture.image}
                      alt={`${capture.angle} view`}
                      className="object-cover w-full h-full"
                    />
                  )}
                  <div className="p-2 text-xs text-center bg-gray-100">
                    {capture.angle.charAt(0).toUpperCase() +
                      capture.angle.slice(1)}
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
              onClick={() => (window.location.href = '/analysis')}
              className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Continue to Analysis →
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
