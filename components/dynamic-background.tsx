"use client"

import { useMemo, useState, useEffect } from "react"
import dynamic from "next/dynamic"

// Dynamically import Beams with no SSR and error boundary
const BeamsBackground = dynamic(() => import("./beams"), {
  ssr: false,
  loading: () => <div className="fixed inset-0 w-full h-full opacity-30 pointer-events-none bg-black" />,
})

interface DynamicBackgroundProps {
  isDiscordOnline: boolean
}

export function DynamicBackground({ isDiscordOnline }: DynamicBackgroundProps) {
  const [isMounted, setIsMounted] = useState(false)
  const [hasWebGL, setHasWebGL] = useState(false)

  // Check for WebGL support and mount status
  useEffect(() => {
    setIsMounted(true)

    // Check WebGL support
    try {
      const canvas = document.createElement("canvas")
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
      setHasWebGL(!!gl)
    } catch (e) {
      setHasWebGL(false)
    }
  }, [])

  // Determine background configuration based on Discord status
  const backgroundConfig = useMemo(() => {
    if (isDiscordOnline) {
      return {
        lightColor: "#5865f2", // Discord blue
        beamNumber: 15,
        speed: 2.0,
        noiseIntensity: 1.8,
        scale: 0.25,
        rotation: 10,
        fallbackColor: "from-blue-900/30 via-blue-700/20 to-indigo-600/30",
        description: "Discord Online",
      }
    } else {
      return {
        lightColor: "#ff4444", // Red for offline
        beamNumber: 12,
        speed: 1.5,
        noiseIntensity: 1.5,
        scale: 0.2,
        rotation: -15,
        fallbackColor: "from-red-900/30 via-red-700/20 to-red-600/30",
        description: "Offline",
      }
    }
  }, [isDiscordOnline])

  // Don't render anything on server side
  if (!isMounted) {
    return <div className="fixed inset-0 w-full h-full opacity-30 pointer-events-none bg-black" />
  }

  // Fallback for browsers without WebGL support
  if (!hasWebGL) {
    return (
      <div
        className={`fixed inset-0 w-full h-full opacity-40 pointer-events-none bg-gradient-to-br ${backgroundConfig.fallbackColor}`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_black_100%)]" />
        {/* Add some animated elements for non-WebGL browsers */}
        <div className="absolute inset-0">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className={`absolute rounded-full opacity-20 animate-pulse`}
              style={{
                width: `${Math.random() * 100 + 50}px`,
                height: `${Math.random() * 100 + 50}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                background: backgroundConfig.lightColor,
                animationDuration: `${Math.random() * 3 + 2}s`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 w-full h-full opacity-40 pointer-events-none">
      <BeamsBackground
        beamWidth={2}
        beamHeight={20}
        beamNumber={backgroundConfig.beamNumber}
        lightColor={backgroundConfig.lightColor}
        speed={backgroundConfig.speed}
        noiseIntensity={backgroundConfig.noiseIntensity}
        scale={backgroundConfig.scale}
        rotation={backgroundConfig.rotation}
      />

      {/* Debug info in development */}
      {process.env.NODE_ENV === "development" && (
        <div className="absolute top-4 left-4 text-xs text-white/50 bg-black/50 p-2 rounded">
          Background: {backgroundConfig.description}
        </div>
      )}
    </div>
  )
}
