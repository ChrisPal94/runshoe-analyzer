'use client'

import Link from 'next/link'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { ModeToggle } from '../components/ui/ModeToggle'
import { useState, useEffect } from 'react'

export function HomeClient() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-end mb-4">
        <ModeToggle />
      </div>
      {/* Hero Section */}
      <section className="text-center mb-12 py-20 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
          Unlock Your Running Potential
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-10">
          Analyze your running shoes with AI to understand wear patterns, get
          personalized recommendations, and optimize your performance.
        </p>
        <div className="flex justify-center space-x-4">
          <Link href="/camera" passHref>
            <Button className="px-8 py-4 text-lg">Start Analysis</Button>
          </Link>
          <Link href="/analysis" passHref>
            <Button variant="secondary" className="px-8 py-4 text-lg">
              Quick Analysis
            </Button>
          </Link>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg mb-12">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="text-center p-4">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
              1
            </div>
            <h4 className="font-semibold mb-2 text-gray-800 dark:text-white">
              Capture Images
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Take photos of your shoes from heel, arch, and forefoot angles
            </p>
          </Card>
          <Card className="text-center p-4">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
              2
            </div>
            <h4 className="font-semibold mb-2 text-gray-800 dark:text-white">
              AI Processing
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Our AI analyzes wear patterns and shoe characteristics
            </p>
          </Card>
          <Card className="text-center p-4">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
              3
            </div>
            <h4 className="font-semibold mb-2 text-gray-800 dark:text-white">
              Get Results
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Receive detailed analysis with confidence scores
            </p>
          </Card>
          <Card className="text-center p-4">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
              4
            </div>
            <h4 className="font-semibold mb-2 text-gray-800 dark:text-white">
              Take Action
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Follow personalized recommendations for optimal performance
            </p>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-gray-600 dark:text-gray-400">
        <p>Built with Next.js and Tailwind CSS</p>
        <div className="flex justify-center space-x-6 mt-4">
          <Link
            href="/camera"
            className="hover:text-blue-600 dark:hover:text-blue-400"
          >
            Camera
          </Link>
          <Link
            href="/analysis"
            className="hover:text-blue-600 dark:hover:text-blue-400"
          >
            Analysis
          </Link>
          <Link
            href="/results"
            className="hover:text-blue-600 dark:hover:text-blue-400"
          >
            Results
          </Link>
        </div>
      </footer>
    </div>
  )
}
