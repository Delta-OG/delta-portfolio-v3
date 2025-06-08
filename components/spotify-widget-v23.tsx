"use client"

import { useState, useEffect, useRef } from "react"
import { Mic, X, ExternalLink, Play, Pause } from "lucide-react"
import { useSpotify } from "@/hooks/use-spotify"

interface SpotifyWidgetV23Props {
  onStatusChange?: (isPlaying: boolean) => void
}

export function SpotifyWidgetV23({ onStatusChange }: SpotifyWidgetV23Props) {
  const { track, lyrics, loading, error } = useSpotify()
  const [showLyrics, setShowLyrics] = useState(false)
  const [currentLineIndex, setCurrentLineIndex] = useState(-1)
  const lyricsContainerRef = useRef<HTMLDivElement>(null)
  const lineRefs = useRef<(HTMLParagraphElement | null)[]>([])

  // Update current line index based on song progress
  useEffect(() => {
    if (!track || !lyrics || lyrics.lines.length === 0) return

    const updateCurrentLine = () => {
      if (!track.is_playing) return

      const currentTimeMs = track.progress_ms
      let newCurrentLineIndex = -1

      // Find the last line that has started playing
      for (let i = lyrics.lines.length - 1; i >= 0; i--) {
        if (currentTimeMs >= lyrics.lines[i].startTimeMs) {
          newCurrentLineIndex = i
          break
        }
      }

      // Only update if the line has changed
      if (newCurrentLineIndex !== currentLineIndex) {
        setCurrentLineIndex(newCurrentLineIndex)
      }
    }

    updateCurrentLine()
    const interval = setInterval(updateCurrentLine, 500)

    return () => clearInterval(interval)
  }, [track, lyrics, currentLineIndex])

  // Scroll to current line when it changes
  useEffect(() => {
    if (currentLineIndex >= 0 && lineRefs.current[currentLineIndex] && lyricsContainerRef.current) {
      lineRefs.current[currentLineIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      })
    }
  }, [currentLineIndex])

  // Reset refs when lyrics change
  useEffect(() => {
    if (lyrics) {
      lineRefs.current = lyrics.lines.map(() => null)
    }
  }, [lyrics])

  // Notify parent component about Spotify status
  useEffect(() => {
    onStatusChange?.(track?.is_playing || false)
  }, [track?.is_playing, onStatusChange])

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000)
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  if (loading) {
    return (
      <div className="bg-gray-800/90 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-5 h-5 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-white text-sm font-medium">Spotify</span>
        </div>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-700 rounded w-1/2"></div>
        </div>
      </div>
    )
  }

  if (error || !track) {
    return (
      <div className="bg-gray-800/90 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
        <div className="flex items-center gap-3 mb-3">
          <svg className="w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z" />
          </svg>
          <span className="text-white text-sm font-medium">Spotify</span>
        </div>
        <p className="text-gray-400 text-sm">{error || "Not connected to Spotify. Please check your credentials."}</p>
      </div>
    )
  }

  // Calculate progress percentage
  const progressPercentage = (track.progress_ms / track.duration_ms) * 100

  return (
    <div className="bg-gray-800/90 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 relative">
      {/* Lyrics Modal */}
      {showLyrics && lyrics && (
        <div className="absolute inset-0 bg-gray-900/95 backdrop-blur-sm rounded-xl p-4 z-10 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Mic className="w-4 h-4 text-green-500" />
              <h3 className="text-white font-medium text-sm">Lyrics</h3>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={track.external_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-green-500 transition-colors"
                title="Open in Spotify"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
              <button onClick={() => setShowLyrics(false)} className="text-gray-400 hover:text-white transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gray-700 rounded-lg flex-shrink-0 overflow-hidden">
              {track.album_art_url ? (
                <img
                  src={track.album_art_url || "/placeholder.svg"}
                  alt="Album art"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z" />
                  </svg>
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium text-sm truncate">{track.name}</p>
              <p className="text-gray-400 text-xs truncate">{track.artist}</p>
            </div>
          </div>

          <div
            ref={lyricsContainerRef}
            className="flex-1 overflow-y-auto space-y-2 pr-2 lyrics-container"
            style={{ scrollBehavior: "smooth" }}
          >
            {lyrics.lines.map((line, index) => (
              <p
                key={index}
                ref={(el) => (lineRefs.current[index] = el)}
                className={`text-sm transition-all duration-300 ${
                  index === currentLineIndex ? "text-green-400 font-medium" : "text-gray-400"
                } ${line.text === "" ? "h-4" : ""}`}
              >
                {line.text}
              </p>
            ))}
          </div>

          {/* Progress Bar in Lyrics View */}
          <div className="mt-4 pt-4 border-t border-gray-700/50">
            <div className="space-y-2">
              <div className="w-full bg-gray-700 rounded-full h-1">
                <div
                  className="bg-green-500 h-1 rounded-full transition-all duration-1000 ease-linear"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-400">
                <span>{formatTime(track.progress_ms)}</span>
                <span>{formatTime(track.duration_ms)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <svg className="w-5 h-5 text-green-500" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z" />
          </svg>
          <span className="text-white text-sm font-medium">
            {track.is_playing ? "Currently Playing" : "Recently Played"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {lyrics && (
            <button
              onClick={() => setShowLyrics(true)}
              className="text-gray-400 hover:text-green-500 transition-colors"
              title="Show lyrics"
            >
              <Mic className="w-4 h-4" />
            </button>
          )}
          <a
            href={track.external_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-green-500 transition-colors"
            title="Open in Spotify"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Song Info */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-gray-700 rounded-lg flex-shrink-0 overflow-hidden relative group">
          {track.album_art_url ? (
            <img
              src={track.album_art_url || "/placeholder.svg"}
              alt="Album art"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <svg className="w-6 h-6 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
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
            {track.is_playing ? <Pause className="w-6 h-6 text-white" /> : <Play className="w-6 h-6 text-white" />}
          </a>
        </div>

        <div className="flex-1 min-w-0">
          <a
            href={track.external_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white font-medium text-sm truncate hover:text-green-400 transition-colors block"
          >
            {track.name}
          </a>
          <p className="text-gray-400 text-xs truncate">{track.artist}</p>
          <p className="text-gray-500 text-xs truncate">{track.album}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="w-full bg-gray-700 rounded-full h-1">
          <div
            className="bg-green-500 h-1 rounded-full transition-all duration-1000 ease-linear"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-400">
          <span>{formatTime(track.progress_ms)}</span>
          <span>{formatTime(track.duration_ms)}</span>
        </div>
      </div>

      {/* Playing Status */}
      {track.is_playing && (
        <div className="flex items-center gap-2 mt-3 text-xs text-green-400">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>Playing on Spotify</span>
        </div>
      )}

      <style jsx>{`
        .lyrics-container::-webkit-scrollbar {
          width: 4px;
        }
        .lyrics-container::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 2px;
        }
        .lyrics-container::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 2px;
        }
        .lyrics-container::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </div>
  )
}
