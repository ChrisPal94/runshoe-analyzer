import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            RunShoe Analyzer
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Analyze your running shoes to understand wear patterns, get personalized recommendations, 
            and optimize your running performance.
          </p>
        </header>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="text-4xl mb-4">📷</div>
            <h3 className="text-xl font-semibold mb-2">Smart Capture</h3>
            <p className="text-gray-600">
              Capture high-quality images of your shoes from multiple angles using your device's camera.
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">AI Analysis</h3>
            <p className="text-gray-600">
              Advanced algorithms analyze wear patterns to identify shoe type and deterioration level.
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="text-4xl mb-4">💡</div>
            <h3 className="text-xl font-semibold mb-2">Smart Recommendations</h3>
            <p className="text-gray-600">
              Get personalized recommendations for shoe replacement and running form improvements.
            </p>
          </div>
        </div>

        {/* Main Actions */}
        <div className="text-center mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Link 
              href="/camera"
              className="bg-blue-600 text-white rounded-lg p-8 hover:bg-blue-700 transition-colors shadow-lg"
            >
              <div className="text-4xl mb-4">📸</div>
              <h3 className="text-2xl font-bold mb-2">Start Analysis</h3>
              <p className="text-blue-100">
                Capture images of your shoes and begin the analysis process
              </p>
            </Link>
            
            <Link 
              href="/analysis"
              className="bg-green-600 text-white rounded-lg p-8 hover:bg-green-700 transition-colors shadow-lg"
            >
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-2xl font-bold mb-2">Quick Analysis</h3>
              <p className="text-green-100">
                Analyze previously captured images or use sample data
              </p>
            </Link>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-lg p-8 shadow-lg mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">1</div>
              <h4 className="font-semibold mb-2">Capture Images</h4>
              <p className="text-sm text-gray-600">Take photos of your shoes from heel, arch, and forefoot angles</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">2</div>
              <h4 className="font-semibold mb-2">AI Processing</h4>
              <p className="text-sm text-gray-600">Our AI analyzes wear patterns and shoe characteristics</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">3</div>
              <h4 className="font-semibold mb-2">Get Results</h4>
              <p className="text-sm text-gray-600">Receive detailed analysis with confidence scores</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">4</div>
              <h4 className="font-semibold mb-2">Take Action</h4>
              <p className="text-sm text-gray-600">Follow personalized recommendations for optimal performance</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center text-gray-600">
          <p>Built with Next.js and Tailwind CSS</p>
          <div className="flex justify-center space-x-6 mt-4">
            <Link href="/camera" className="hover:text-blue-600">Camera</Link>
            <Link href="/analysis" className="hover:text-blue-600">Analysis</Link>
            <Link href="/results" className="hover:text-blue-600">Results</Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
