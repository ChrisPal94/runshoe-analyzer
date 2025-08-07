'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Progress } from '@/components/ui/Progress'
import { shoeAnalysis } from '@/lib/shoeAnalysis'
import { AnalysisResult } from '@/lib/types'

interface ShoeAnalyzerProps {
  captures: string[]
  onAnalysisComplete: (result: AnalysisResult) => void
  className?: string
}

export function ShoeAnalyzer({ captures, onAnalysisComplete, className }: ShoeAnalyzerProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState('')

  const analysisSteps = [
    'Processing images...',
    'Analyzing wear patterns...',
    'Detecting shoe type...',
    'Generating recommendations...',
    'Finalizing results...'
  ]

  const startAnalysis = async () => {
    if (captures.length === 0) return

    setIsAnalyzing(true)
    setProgress(0)
    setCurrentStep(analysisSteps[0])

    try {
      // Simulate progress updates
      for (let i = 0; i < analysisSteps.length; i++) {
        setCurrentStep(analysisSteps[i])
        setProgress((i + 1) * (100 / analysisSteps.length))
        await new Promise(resolve => setTimeout(resolve, 800))
      }

      // Perform actual analysis
      const result = await shoeAnalysis.analyzeShoe(captures)
      onAnalysisComplete(result)
    } catch (error) {
      console.error('Analysis failed:', error)
      setCurrentStep('Analysis failed. Please try again.')
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Shoe Analysis</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-gray-600">
          <p>Captured {captures.length} image{captures.length !== 1 ? 's' : ''}</p>
        </div>

        {isAnalyzing ? (
          <div className="space-y-4">
            <Progress value={progress} className="w-full" />
            <div className="text-center">
              <div className="text-sm font-medium text-gray-700">
                {currentStep}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {Math.round(progress)}% complete
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {captures.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {captures.map((capture, index) => (
                  <div key={index} className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={capture}
                      alt={`Capture ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <div className="text-4xl mb-2">📷</div>
                <p>No images captured yet</p>
              </div>
            )}

            <Button
              onClick={startAnalysis}
              disabled={captures.length === 0 || isAnalyzing}
              isLoading={isAnalyzing}
              className="w-full"
            >
              {isAnalyzing ? 'Analyzing...' : 'Start Analysis'}
            </Button>
          </div>
        )}

        <div className="text-sm text-gray-600">
          <p className="font-medium">Analysis Process:</p>
          <ul className="list-disc list-inside mt-1 space-y-1">
            <li>Image processing and enhancement</li>
            <li>Wear pattern detection</li>
            <li>Shoe type classification</li>
            <li>Recommendation generation</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
