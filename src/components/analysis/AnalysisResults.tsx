'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { AnalysisResult } from '@/lib/types'
import { shoeAnalysis } from '@/lib/shoeAnalysis'

interface AnalysisResultsProps {
  result: AnalysisResult
  className?: string
}

export function AnalysisResults({ result, className }: AnalysisResultsProps) {
  const confidenceColor = result.confidence >= 0.8 ? 'text-green-600' : 
                         result.confidence >= 0.6 ? 'text-yellow-600' : 'text-red-600'

  const confidenceLabel = result.confidence >= 0.8 ? 'High' :
                         result.confidence >= 0.6 ? 'Medium' : 'Low'

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Analysis Results</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Shoe Type */}
        <div className="space-y-2">
          <h3 className="font-semibold text-lg">Shoe Type</h3>
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-gray-900">{result.shoeType}</p>
          </div>
        </div>

        {/* Wear Pattern */}
        <div className="space-y-2">
          <h3 className="font-semibold text-lg">Wear Pattern</h3>
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-gray-900">{result.wearPattern}</p>
            <p className="text-sm text-gray-600 mt-1">
              {shoeAnalysis.getWearPatternDescription(result.wearPattern)}
            </p>
          </div>
        </div>

        {/* Confidence */}
        <div className="space-y-2">
          <h3 className="font-semibold text-lg">Analysis Confidence</h3>
          <div className="flex items-center space-x-3">
            <div className={`text-2xl font-bold ${confidenceColor}`}>
              {Math.round(result.confidence * 100)}%
            </div>
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
              confidenceColor === 'text-green-600' ? 'bg-green-100 text-green-800' :
              confidenceColor === 'text-yellow-600' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {confidenceLabel} Confidence
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="space-y-2">
          <h3 className="font-semibold text-lg">Recommendations</h3>
          <div className="space-y-2">
            {result.recommendations.map((recommendation, index) => (
              <div key={index} className="flex items-start space-x-2 p-3 bg-blue-50 rounded-lg">
                <div className="text-blue-600 mt-0.5">💡</div>
                <p className="text-gray-900">{recommendation}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="border-t pt-4">
          <div className="text-sm text-gray-600">
            <p className="font-medium">Analysis Summary:</p>
            <p className="mt-1">
              Based on the captured images, your shoes show a {result.wearPattern.toLowerCase()}. 
              The analysis has {confidenceLabel.toLowerCase()} confidence in these results.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
