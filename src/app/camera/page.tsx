'use client'

import { useState, useRef, useCallback } from 'react'
import Webcam from 'react-webcam'
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

  const webcamRef = useRef<Webcam>(null)

  const capturePhoto = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot()
      if (imageSrc && selectedAngle) {
        const preview = cameraUtils.createPhotoPreview(imageSrc, selectedAngle)
        setCurrentPreview(preview)
        setShowPreview(true)
      }
    }
  }, [webcamRef, selectedAngle])

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

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
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
          <div className="relative w-full h-96 bg-gray-200 rounded-lg overflow-hidden">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width="100%"
              height="100%"
              videoConstraints={{
                facingMode: 'environment'
              }}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <button
              onClick={capturePhoto}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
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
            </button>
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
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-lg mb-3">
              Captured Images ({captures.length})
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {captures.map((capture, index) => (
                <div
                  key={index}
                  className="aspect-square bg-white rounded-lg overflow-hidden shadow-sm"
                >
                  {capture.image && (
                    <img
                      src={capture.image}
                      alt={`${capture.angle} view`}
                      className="w-full h-full object-cover"
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
