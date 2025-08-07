import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */

  // Suppress hydration warnings caused by browser extensions
  onRecoverableError: (
    error: Error,
    errorInfo: { componentStack?: string }
  ) => {
    // Suppress all hydration errors (commonly caused by browser extensions)
    const anyError = error as any
    if (
      anyError.digest?.includes?.('NEXT_HYDRATION_MISMATCH') ||
      error.message?.toLowerCase().includes('hydration')
    ) {
      return
    }

    // Log other errors normally
    console.error('Recoverable error:', error, errorInfo)
  },

  // Optional: Enable React Strict Mode (recommended)
  reactStrictMode: true
}

export default nextConfig
