"use client"

import { useMemo, useState, useEffect } from "react"
import dynamic from "next/dynamic"

// Dynamically import Beams with no SSR and error boundary
const Beams = dynamic(() => import("./beams").catch(() => ({ default: () => null })), {
  ssr: false,
  loading: () => <div className="fixed inset-0 w-full h-full opacity-30 pointer-events-none bg-black" />,
})

interface DynamicBackgroundProps {
  isOnline: boolean
  isSpotifyPlaying: boolean
}

export function DynamicBackground({ isOnline, isSpotifyPlaying }: DynamicBackgroundProps) {
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

  // Determine background color based on priority rules
  const backgroundConfig = useMemo(() => {
    const shouldShowGreen = isSpotifyPlaying || isOnline

    if (shouldShowGreen) {
      return {
        lightColor: "#00ff88",
        beamNumber: 15,
        speed: 2.5,
        noiseIntensity: 2.0,
        scale: 0.25,
        rotation: 15,
        fallbackColor: "from-green-900/20 to-green-600/20",
      }
    } else {
      return {
        lightColor: "#ff4444",
        beamNumber: 12,
        speed: 1.8,
        noiseIntensity: 1.5,
        scale: 0.2,
        rotation: -10,
        fallbackColor: "from-red-900/20 to-red-600/20",
      }
    }
  }, [isOnline, isSpotifyPlaying])

  // Don't render anything on server side
  if (!isMounted) {
    return <div className="fixed inset-0 w-full h-full opacity-30 pointer-events-none bg-black" />
  }

  // Fallback for browsers without WebGL support
  if (!hasWebGL) {
    return (
      <div
        className={`fixed inset-0 w-full h-full opacity-30 pointer-events-none bg-gradient-to-br ${backgroundConfig.fallbackColor}`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_black_100%)]" />
      </div>
    )
  }

  return (
    <div className="fixed inset-0 w-full h-full opacity-30 pointer-events-none">
      <Beams
        beamWidth={2}
        beamHeight={20}
        beamNumber={backgroundConfig.beamNumber}
        lightColor={backgroundConfig.lightColor}
        speed={backgroundConfig.speed}
        noiseIntensity={backgroundConfig.noiseIntensity}
        scale={backgroundConfig.scale}
        rotation={backgroundConfig.rotation}
      />
    </div>
  )
}
