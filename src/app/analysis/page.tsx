'use client'

import { useState, useEffect } from 'react'
import { ShoeAnalyzer } from '@/components/analysis/ShoeAnalyzer'
import { AnalysisResults } from '@/components/analysis/AnalysisResults'
import { AnalysisResult } from '@/lib/types'

export default function AnalysisPage() {
  const [captures, setCaptures] = useState<string[]>([])
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    // In a real app, you'd get captures from state management or URL params
    // For now, we'll simulate some captures
    const mockCaptures = [
      'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k='
    ]
    setCaptures(mockCaptures)
  }, [])

  const handleAnalysisComplete = (result: AnalysisResult) => {
    setAnalysisResult(result)
    setIsComplete(true)
  }

  const handleNewAnalysis = () => {
    setAnalysisResult(null)
    setIsComplete(false)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Shoe Analysis</h1>
        <p className="text-gray-600">
          Analyze your captured shoe images to understand wear patterns and get recommendations
        </p>
      </div>

      <div className="space-y-6">
        {!isComplete ? (
          <ShoeAnalyzer
            captures={captures}
            onAnalysisComplete={handleAnalysisComplete}
          />
        ) : (
          <div className="space-y-6">
            <AnalysisResults result={analysisResult!} />
            
            <div className="flex gap-4">
              <button
                onClick={handleNewAnalysis}
                className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                Analyze Another Shoe
              </button>
              
              <button
                onClick={() => window.location.href = '/results'}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                View Detailed Results →
              </button>
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
          
          <button
            onClick={() => window.location.href = '/camera'}
            className="px-4 py-2 text-blue-600 hover:text-blue-800"
          >
            Capture More Images
          </button>
        </div>
      </div>
    </div>
  )
}
