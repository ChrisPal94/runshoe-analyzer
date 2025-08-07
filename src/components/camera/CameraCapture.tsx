'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { cameraUtils } from '@/lib/cameraUtils'
import { CameraCapture as CameraCaptureType } from '@/lib/types'

interface CameraCaptureProps {
  onCapture: (capture: CameraCaptureType) => void
  angle: 'heel' | 'arch' | 'forefoot'
  className?: string
}

export function CameraCapture({ onCapture, angle, className }: CameraCaptureProps) {
  const [isCapturing, setIsCapturing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop())
      }
    }
  }, [])

  const startCamera = async () => {
    try {
      setError(null)
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment',
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        }
      })
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        streamRef.current = stream
      }
    } catch (err) {
      setError('Failed to access camera. Please check permissions.')
      console.error('Camera error:', err)
    }
  }

  const capturePhoto = async () => {
    if (!videoRef.current) return

    try {
      setIsCapturing(true)
      setError(null)
      
      const image = await cameraUtils.captureImage()
      const capture = cameraUtils.createCapture(image, angle)
      
      onCapture(capture)
    } catch (err) {
      setError('Failed to capture photo. Please try again.')
      console.error('Capture error:', err)
    } finally {
      setIsCapturing(false)
    }
  }

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
  }

  const angleLabels = {
    heel: 'Heel View',
    arch: 'Arch View', 
    forefoot: 'Forefoot View'
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Capture {angleLabels[angle]}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
          {!videoRef.current?.srcObject && (
            <div className="absolute inset-0 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <div className="text-4xl mb-2">📷</div>
                <p>Camera not started</p>
              </div>
            </div>
          )}
        </div>
        
        {error && (
          <div className="text-red-500 text-sm p-3 bg-red-50 rounded-md">
            {error}
          </div>
        )}
        
        <div className="flex gap-2">
          {!videoRef.current?.srcObject ? (
            <Button onClick={startCamera} className="flex-1">
              Start Camera
            </Button>
          ) : (
            <>
              <Button 
                onClick={capturePhoto} 
                disabled={isCapturing}
                isLoading={isCapturing}
                className="flex-1"
              >
                {isCapturing ? 'Capturing...' : 'Take Photo'}
              </Button>
              <Button 
                onClick={stopCamera} 
                variant="outline"
                disabled={isCapturing}
              >
                Stop Camera
              </Button>
            </>
          )}
        </div>
        
        <div className="text-sm text-gray-600">
          <p>Instructions:</p>
          <ul className="list-disc list-inside mt-1 space-y-1">
            <li>Position your shoe clearly in the frame</li>
            <li>Ensure good lighting</li>
            <li>Hold the camera steady when capturing</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
