export interface ShoeAnalysis {
  id: string
  timestamp: Date
  angles: {
    heel: number
    arch: number
    forefoot: number
  }
  recommendations: string[]
  confidence: number
  imageUrl: string
}

export interface CameraCapture {
  image: string
  angle: 'heel' | 'arch' | 'forefoot'
  timestamp: Date
}

export interface AnalysisResult {
  shoeType: string
  wearPattern: string
  recommendations: string[]
  confidence: number
}

export interface PhotoPreview {
  image: string
  angle: 'heel' | 'arch' | 'forefoot'
  isValid: boolean
  errorMessage?: string
}
