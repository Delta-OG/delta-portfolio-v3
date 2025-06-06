"use client"

import { useState, useEffect } from "react"
import { Music } from "lucide-react"

interface SpotifyTrack {
  name: string
  artist: string
  album_art_url?: string
  timestamps?: {
    start: number
    end: number
  }
}

interface SpotifyWidgetProps {
  track?: SpotifyTrack | null
  isPlaying?: boolean
}

export function SpotifyWidget({ track, isPlaying = false }: SpotifyWidgetProps) {
  const [currentTime, setCurrentTime] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!track?.timestamps || !isPlaying) return

    const startTime = track.timestamps.start
    const endTime = track.timestamps.end
    const duration = endTime - startTime

    const updateProgress = () => {
      const now = Date.now()
      const elapsed = now - startTime
      const progressPercent = Math.min((elapsed / duration) * 100, 100)

      setCurrentTime(elapsed)
      setProgress(progressPercent)
    }

    updateProgress()
    const interval = setInterval(updateProgress, 1000)

    return () => clearInterval(interval)
  }, [track, isPlaying])

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000)
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const totalDuration = track?.timestamps ? track.timestamps.end - track.timestamps.start : 0

  if (!track) {
    return (
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
        <div className="flex items-center gap-3 text-gray-400">
          <Music className="w-5 h-5" />
          <span className="text-sm font-medium">Not listening to Spotify</span>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        <span className="text-green-400 text-sm font-medium">Currently Playing</span>
      </div>

      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-gray-700 rounded-lg flex-shrink-0 overflow-hidden">
          {track.album_art_url ? (
            <img
              src={track.album_art_url || "/placeholder.svg"}
              alt="Album art"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Music className="w-6 h-6 text-gray-400" />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-white font-medium text-sm truncate">{track.name}</p>
          <p className="text-gray-400 text-xs truncate">{track.artist}</p>
        </div>
      </div>

      {track.timestamps && (
        <div className="mt-3">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(totalDuration)}</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-1">
            <div
              className="bg-green-500 h-1 rounded-full transition-all duration-1000 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
