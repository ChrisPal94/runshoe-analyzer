import { CameraCapture, PhotoPreview } from './types'

export const cameraUtils = {
  // Capture image from camera
  async captureImage(): Promise<string> {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment',
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        } 
      })
      
      const video = document.createElement('video')
      video.srcObject = stream
      await video.play()
      
      const canvas = document.createElement('canvas')
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      
      const ctx = canvas.getContext('2d')
      ctx?.drawImage(video, 0, 0)
      
      stream.getTracks().forEach(track => track.stop())
      
      return canvas.toDataURL('image/jpeg', 0.8)
    } catch (error) {
      console.error('Error capturing image:', error)
      throw new Error('Failed to capture image')
    }
  },

  // Validate captured image
  validateImage(imageData: string): { isValid: boolean; errorMessage?: string } {
    if (!imageData) {
      return { isValid: false, errorMessage: 'No image captured' }
    }
    
    // Basic validation - check if it's a valid data URL
    if (!imageData.startsWith('data:image/')) {
      return { isValid: false, errorMessage: 'Invalid image format' }
    }
    
    return { isValid: true }
  },

  // Create camera capture object
  createCapture(image: string, angle: 'heel' | 'arch' | 'forefoot'): CameraCapture {
    return {
      image,
      angle,
      timestamp: new Date()
    }
  },

  // Create photo preview object
  createPhotoPreview(image: string, angle: 'heel' | 'arch' | 'forefoot'): PhotoPreview {
    const validation = this.validateImage(image)
    return {
      image,
      angle,
      isValid: validation.isValid,
      errorMessage: validation.errorMessage
    }
  }
}
