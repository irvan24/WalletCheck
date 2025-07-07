'use client' // seulement si App Router

import { useEffect, useState } from 'react'

export default function LoadingPage() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + Math.floor(Math.random() * 10 + 5)
      })
    }, 300)

    return () => clearInterval(interval)
  }, [])

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-semibold mb-8">🔄 Analyse en cours...</h1>

      <div className="w-full max-w-md bg-gray-800 rounded-full h-6 overflow-hidden">
        <div
          className="bg-yellow-500 h-full transition-all duration-300 ease-in-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="mt-4 text-gray-300">{progress}%</p>
    </main>
  )
}
