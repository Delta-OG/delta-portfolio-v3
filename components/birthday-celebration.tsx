"use client"

import { useState, useEffect } from "react"

export function BirthdayCelebration() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Show celebration immediately when component mounts
    setIsVisible(true)

    // Hide after 4 seconds
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 4000)

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      {/* Balloons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Left side balloons */}
        <div className="absolute left-10 top-20 text-6xl animate-bounce" style={{ animationDelay: "0s" }}>
          🎈
        </div>
        <div className="absolute left-20 top-40 text-5xl animate-bounce" style={{ animationDelay: "0.5s" }}>
          🎈
        </div>
        <div className="absolute left-5 top-60 text-7xl animate-bounce" style={{ animationDelay: "1s" }}>
          🎈
        </div>

        {/* Right side balloons */}
        <div className="absolute right-10 top-20 text-6xl animate-bounce" style={{ animationDelay: "0.3s" }}>
          🎈
        </div>
        <div className="absolute right-20 top-40 text-5xl animate-bounce" style={{ animationDelay: "0.8s" }}>
          🎈
        </div>
        <div className="absolute right-5 top-60 text-7xl animate-bounce" style={{ animationDelay: "1.3s" }}>
          🎈
        </div>

        {/* Floating balloons */}
        <div className="absolute left-1/4 top-10 text-4xl animate-pulse" style={{ animationDelay: "0.2s" }}>
          🎈
        </div>
        <div className="absolute right-1/4 top-10 text-4xl animate-pulse" style={{ animationDelay: "0.7s" }}>
          🎈
        </div>

        {/* Confetti */}
        <div className="absolute left-1/3 top-1/4 text-3xl animate-spin" style={{ animationDelay: "0.1s" }}>
          🎊
        </div>
        <div className="absolute right-1/3 top-1/4 text-3xl animate-spin" style={{ animationDelay: "0.6s" }}>
          🎊
        </div>
        <div className="absolute left-1/2 top-1/3 text-4xl animate-pulse" style={{ animationDelay: "0.4s" }}>
          🎉
        </div>
      </div>

      {/* Main celebration text */}
      <div className="text-center animate-in zoom-in duration-1000">
        <div className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent animate-pulse mb-4">
          🎂 Happy Birthday! 🎂
        </div>
        <div className="text-6xl md:text-7xl font-bold text-white animate-bounce mb-6">Delta</div>
        <div className="text-2xl md:text-3xl text-purple-300 animate-pulse">🎉 Welcome to 16! 🎉</div>

        {/* Sparkles around text */}
        <div className="absolute -top-10 -left-10 text-4xl animate-spin">✨</div>
        <div className="absolute -top-10 -right-10 text-4xl animate-spin" style={{ animationDelay: "0.5s" }}>
          ✨
        </div>
        <div className="absolute -bottom-10 -left-10 text-4xl animate-spin" style={{ animationDelay: "1s" }}>
          ✨
        </div>
        <div className="absolute -bottom-10 -right-10 text-4xl animate-spin" style={{ animationDelay: "1.5s" }}>
          ✨
        </div>
      </div>
    </div>
  )
}
