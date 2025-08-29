import type { Metadata } from 'next'
import { HomeClient } from './HomeClient'

export const metadata: Metadata = {
  title: 'RunShoe Analyzer',
  description:
    'Analyze your running shoes with AI to understand wear patterns, get personalized recommendations, and optimize your running performance.'
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-black">
      <HomeClient />
    </div>
  )
}
