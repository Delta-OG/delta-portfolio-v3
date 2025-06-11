"use client"

import { useState, useEffect } from "react"
import { SpotlightCard } from "./spotlight-card"
import { Pause, Play, Volume2, ExternalLink } from "lucide-react"
import type { SpotifyTrack } from "@/hooks/use-spotify"

interface SpotifyEmbedProps {
  track: SpotifyTrack | null
  loading: boolean
  isOnline: boolean
}

export function SpotifyEmbed({ track, loading, isOnline }: SpotifyEmbedProps) {
  const [progress, setProgress] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  // Update progress for playing tracks
  useEffect(() => {
    if (!track?.is_playing) {
      setIsPlaying(false)
      return
    }

    setIsPlaying(true)

    const updateProgress = () => {
      if (!track.timestamps) return

      const now = Date.now()
      const elapsed = now - track.timestamps.start
      const progressPercent = Math.min((elapsed / track.duration_ms) * 100, 100)

      setProgress(progressPercent)

      if (progressPercent >= 100) {
        setIsPlaying(false)
      }
    }

    updateProgress()
    const interval = setInterval(updateProgress, 1000)

    return () => clearInterval(interval)
  }, [track])

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000)
    const seconds = Math.floor((ms % 60000) / 1000)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  // Calculate current time based on progress
  const getCurrentTime = () => {
    if (!track) return "0:00"
    return formatTime((track.duration_ms * progress) / 100)
  }

  // Get total duration
  const getDuration = () => {
    if (!track) return "0:00"
    return formatTime(track.duration_ms)
  }

  // Get spotlight color based on status
  const getSpotlightColor = () => {
    if (track?.is_playing) return "rgba(30, 215, 96, 0.15)" // Spotify green
    if (isOnline) return "rgba(88, 101, 242, 0.15)" // Discord blue
    return "rgba(255, 68, 68, 0.15)" // Red for offline
  }

  // Get border color based on status
  const getBorderColor = () => {
    if (track?.is_playing) return "rgba(30, 215, 96, 0.3)" // Spotify green
    if (isOnline) return "rgba(88, 101, 242, 0.3)" // Discord blue
    return "rgba(255, 68, 68, 0.3)" // Red for offline
  }

  if (loading) {
    return (
      <SpotlightCard
        className="p-4 border-gray-800/50"
        spotlightColor="rgba(255, 255, 255, 0.1)"
        borderColor="rgba(255, 255, 255, 0.1)"
      >
        <div className="flex items-center gap-3 mb-3">
          <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z" />
          </svg>
          <span className="text-gray-400 text-sm font-medium">Spotify</span>
        </div>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-700 rounded w-1/2"></div>
        </div>
      </SpotlightCard>
    )
  }

  if (!track) {
    return (
      <SpotlightCard
        className="p-4 border-gray-800/50"
        spotlightColor={getSpotlightColor()}
        borderColor={getBorderColor()}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z" />
            </svg>
            <span className="text-white text-sm font-medium">Spotify</span>
          </div>
        </div>
        <div className="text-gray-400 text-sm">Not currently playing anything on Spotify</div>
      </SpotlightCard>
    )
  }

  return (
    <SpotlightCard
      className="p-4 border-gray-800/50"
      spotlightColor={getSpotlightColor()}
      borderColor={getBorderColor()}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-green-400 text-sm font-medium">Currently Listening</span>
        </div>
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-green-500" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z" />
          </svg>
          <span className="text-xs text-gray-400">Spotify</span>
        </div>
      </div>

      {/* Track Info */}
      <div className="flex items-center gap-4 mb-4">
        <div className="relative w-16 h-16 bg-gray-800 rounded-md overflow-hidden flex-shrink-0 group">
          {track.album_art_url ? (
            <img
              src={track.album_art_url || "/placeholder.svg"}
              alt={`${track.name} album art`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-800">
              <svg className="w-8 h-8 text-gray-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z" />
              </svg>
            </div>
          )}

          {/* Play/Pause Overlay */}
          <a
            href={track.external_url}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
          >
            {isPlaying ? <Pause className="w-8 h-8 text-white" /> : <Play className="w-8 h-8 text-white" />}
          </a>
        </div>

        <div className="flex-1 min-w-0">
          <a
            href={track.external_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white font-medium text-base truncate hover:text-green-400 transition-colors flex items-center gap-1 group"
          >
            {track.name}
            <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
          <p className="text-gray-400 text-sm truncate">by {track.artist}</p>
          <p className="text-gray-500 text-xs truncate">{track.album}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
          <div
            className="bg-green-500 h-1.5 rounded-full transition-all duration-1000 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-400">
          <span>{getCurrentTime()}</span>
          <span>{getDuration()}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-2 text-xs text-green-400">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>Playing on Spotify</span>
        </div>
        <div className="flex items-center gap-1 text-gray-400">
          <Volume2 className="w-3 h-3" />
        </div>
      </div>
    </SpotlightCard>
  )
}
