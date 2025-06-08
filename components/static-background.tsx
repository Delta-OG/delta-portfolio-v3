"use client"

import { useMemo } from "react"

interface StaticBackgroundProps {
  isOnline: boolean
  isSpotifyPlaying: boolean
}

export function StaticBackground({ isOnline, isSpotifyPlaying }: StaticBackgroundProps) {
  // Determine background color based on priority rules
  const backgroundConfig = useMemo(() => {
    const shouldShowGreen = isSpotifyPlaying || isOnline

    if (shouldShowGreen) {
      return {
        primaryColor: "from-green-900/30 via-green-800/20 to-green-600/30",
        accentColor: "from-green-500/10 to-emerald-500/10",
        glowColor: "shadow-green-500/20",
        particleColor: "bg-green-400/30",
      }
    } else {
      return {
        primaryColor: "from-red-900/30 via-red-800/20 to-red-600/30",
        accentColor: "from-red-500/10 to-pink-500/10",
        glowColor: "shadow-red-500/20",
        particleColor: "bg-red-400/30",
      }
    }
  }, [isOnline, isSpotifyPlaying])

  return (
    <div className="fixed inset-0 w-full h-full opacity-40 pointer-events-none overflow-hidden">
      {/* Primary Gradient Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${backgroundConfig.primaryColor}`} />

      {/* Radial Gradient Overlay */}
      <div className={`absolute inset-0 bg-gradient-radial ${backgroundConfig.accentColor}`} />

      {/* Animated Geometric Shapes */}
      <div className="absolute inset-0">
        {/* Large floating orbs */}
        <div
          className={`absolute top-1/4 left-1/4 w-32 h-32 rounded-full ${backgroundConfig.particleColor} blur-xl animate-pulse`}
          style={{ animationDuration: "4s" }}
        />
        <div
          className={`absolute top-3/4 right-1/4 w-24 h-24 rounded-full ${backgroundConfig.particleColor} blur-lg animate-pulse`}
          style={{ animationDuration: "6s", animationDelay: "2s" }}
        />
        <div
          className={`absolute top-1/2 left-1/6 w-16 h-16 rounded-full ${backgroundConfig.particleColor} blur-md animate-pulse`}
          style={{ animationDuration: "5s", animationDelay: "1s" }}
        />

        {/* Floating lines/beams effect */}
        <div className="absolute inset-0">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className={`absolute h-px ${backgroundConfig.particleColor} blur-sm animate-pulse`}
              style={{
                width: `${Math.random() * 200 + 100}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                transform: `rotate(${Math.random() * 360}deg)`,
                animationDuration: `${Math.random() * 3 + 2}s`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />

        {/* Noise texture overlay */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Vignette effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_black_100%)] opacity-60" />
    </div>
  )
}
