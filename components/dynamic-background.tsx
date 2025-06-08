"use client"

import { useMemo } from "react"
import Beams from "./beams"

interface DynamicBackgroundProps {
  isOnline: boolean
  isSpotifyPlaying: boolean
}

export function DynamicBackground({ isOnline, isSpotifyPlaying }: DynamicBackgroundProps) {
  // Determine background color based on priority rules
  const backgroundConfig = useMemo(() => {
    // Spotify status has priority over Discord status
    // Green conditions:
    // 1. Online on Discord OR playing Spotify
    // 2. Offline on Discord but playing Spotify
    // 3. Online on Discord without playing Spotify

    // Red condition:
    // Only if offline on Discord AND not playing Spotify

    const shouldShowGreen = isSpotifyPlaying || isOnline

    if (shouldShowGreen) {
      return {
        lightColor: "#00ff88", // Bright green
        beamNumber: 15,
        speed: 2.5,
        noiseIntensity: 2.0,
        scale: 0.25,
        rotation: 15,
      }
    } else {
      return {
        lightColor: "#ff4444", // Bright red
        beamNumber: 12,
        speed: 1.8,
        noiseIntensity: 1.5,
        scale: 0.2,
        rotation: -10,
      }
    }
  }, [isOnline, isSpotifyPlaying])

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
