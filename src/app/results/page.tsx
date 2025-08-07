'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { RecommendationCard } from '@/components/analysis/RecommendationCard'
import { AnalysisResult } from '@/lib/types'

export default function ResultsPage() {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)

  useEffect(() => {
    // In a real app, you'd get this from state management or API
    // For now, we'll simulate a result
    const mockResult: AnalysisResult = {
      shoeType: 'Running shoes',
      wearPattern: 'Excessive heel wear',
      recommendations: [
        'Consider replacing your shoes due to excessive heel wear',
        'Monitor your running form to prevent overpronation',
        'Consider shoes with better heel cushioning'
      ],
      confidence: 0.85
    }
    setAnalysisResult(mockResult)
  }, [])

  if (!analysisResult) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center py-12">
          <div className="text-4xl mb-4">📊</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">No Results Available</h1>
          <p className="text-gray-600 mb-6">
            Please complete an analysis first to view detailed results.
          </p>
          <button
            onClick={() => window.location.href = '/analysis'}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Start Analysis
          </button>
        </div>
      </div>
    )
  }

  const recommendations = [
    {
      title: 'Replace Shoes',
      description: 'Your shoes show excessive heel wear which indicates they may be past their optimal lifespan.',
      priority: 'high' as const,
      action: {
        label: 'Find New Shoes',
        onClick: () => window.open('https://example.com/shoes', '_blank')
      }
    },
    {
      title: 'Improve Running Form',
      description: 'Heel wear suggests overpronation. Consider working on your running technique.',
      priority: 'medium' as const,
      action: {
        label: 'Learn More',
        onClick: () => window.open('https://example.com/form', '_blank')
      }
    },
    {
      title: 'Consider Orthotics',
      description: 'If heel wear persists, custom orthotics may help with foot alignment.',
      priority: 'low' as const
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Detailed Analysis Results</h1>
        <p className="text-gray-600">
          Comprehensive breakdown of your shoe analysis and personalized recommendations
        </p>
      </div>

      <div className="space-y-8">
        {/* Summary Card */}
        <Card>
          <CardHeader>
            <CardTitle>Analysis Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {analysisResult.shoeType}
                </div>
                <div className="text-sm text-gray-600">Shoe Type</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">
                  {analysisResult.wearPattern}
                </div>
                <div className="text-sm text-gray-600">Wear Pattern</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {Math.round(analysisResult.confidence * 100)}%
                </div>
                <div className="text-sm text-gray-600">Confidence</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Recommendations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommendations.map((rec, index) => (
              <RecommendationCard
                key={index}
                title={rec.title}
                description={rec.description}
                priority={rec.priority}
                action={rec.action}
              />
            ))}
          </div>
        </div>

        {/* Detailed Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Detailed Analysis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <h3 className="font-semibold text-lg mb-2">Wear Pattern Analysis</h3>
                <p className="text-gray-700">
                  Your shoes show excessive heel wear, which typically indicates overpronation 
                  or heel striking during your running gait. This pattern suggests that your 
                  shoes may be past their optimal lifespan and could be contributing to 
                  potential injury risk.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-2">Shoe Type Classification</h3>
                <p className="text-gray-700">
                  Based on the wear patterns and construction visible in the images, 
                  your shoes are classified as running shoes. The wear pattern is 
                  consistent with typical running shoe deterioration.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-2">Confidence Assessment</h3>
                <p className="text-gray-700">
                  The analysis has high confidence (85%) in these results based on 
                  clear wear patterns and consistent image quality. Multiple angles 
                  were captured, improving the accuracy of the assessment.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Items */}
        <Card>
          <CardHeader>
            <CardTitle>Next Steps</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                <span>Consider replacing your current shoes</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                <span>Monitor your running form and gait</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                <span>Schedule a follow-up analysis in 3-6 months</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-8">
        <button
          onClick={() => window.history.back()}
          className="px-4 py-2 text-gray-600 hover:text-gray-900"
        >
          ← Back
        </button>
        
        <div className="space-x-4">
          <button
            onClick={() => window.location.href = '/camera'}
            className="px-4 py-2 text-blue-600 hover:text-blue-800"
          >
            Analyze Another Shoe
          </button>
          
          <button
            onClick={() => window.print()}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            Print Results
          </button>
        </div>
      </div>
    </div>
  )
}
