"use client"

import { useState, useEffect, useRef } from "react"
import { Mic, X, ExternalLink } from "lucide-react"
import type { LanyardData } from "@/hooks/use-lanyard"

interface SpotifyWidgetV23Props {
  data?: LanyardData | null
  loading?: boolean
  onStatusChange?: (isPlaying: boolean) => void
}

interface LyricsLine {
  text: string
  startTimeMs: number
}

export function SpotifyWidgetV23({ data, loading, onStatusChange }: SpotifyWidgetV23Props) {
  const [currentTime, setCurrentTime] = useState(0)
  const [progress, setProgress] = useState(0)
  const [showLyrics, setShowLyrics] = useState(false)
  const [lyrics, setLyrics] = useState<LyricsLine[]>([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoadingLyrics, setIsLoadingLyrics] = useState(false)
  const [lyricsError, setLyricsError] = useState<string | null>(null)
  const [currentLineIndex, setCurrentLineIndex] = useState(-1)
  const lyricsContainerRef = useRef<HTMLDivElement>(null)
  const lineRefs = useRef<(HTMLParagraphElement | null)[]>([])

  const spotifyData = data?.listening_to_spotify ? data.spotify : null

  // Handle Spotify status and progress updates
  useEffect(() => {
    const newIsPlaying = !!(spotifyData && data?.listening_to_spotify)
    setIsPlaying(newIsPlaying)
    onStatusChange?.(newIsPlaying)

    if (!spotifyData?.timestamps || !data?.listening_to_spotify) {
      setCurrentTime(0)
      setProgress(0)
      return
    }

    const updateProgress = () => {
      const startTime = spotifyData.timestamps.start
      const endTime = spotifyData.timestamps.end
      const now = Date.now()
      const elapsed = now - startTime
      const duration = endTime - startTime

      // Check if song has ended
      if (elapsed >= duration) {
        setCurrentTime(duration)
        setProgress(100)
        return
      }

      setCurrentTime(elapsed)
      const progressPercent = Math.min((elapsed / duration) * 100, 100)
      setProgress(progressPercent)

      // Find current line based on timestamp
      if (lyrics.length > 0) {
        let newCurrentLineIndex = -1

        // Find the last line that has started playing
        for (let i = lyrics.length - 1; i >= 0; i--) {
          if (elapsed >= lyrics[i].startTimeMs) {
            newCurrentLineIndex = i
            break
          }
        }

        // Only update if the line has changed
        if (newCurrentLineIndex !== currentLineIndex) {
          setCurrentLineIndex(newCurrentLineIndex)
        }
      }
    }

    updateProgress()
    const interval = setInterval(updateProgress, 1000)

    return () => clearInterval(interval)
  }, [spotifyData, data?.listening_to_spotify, onStatusChange, lyrics, currentLineIndex])

  // Scroll to current line when it changes
  useEffect(() => {
    if (currentLineIndex >= 0 && lineRefs.current[currentLineIndex] && lyricsContainerRef.current) {
      lineRefs.current[currentLineIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      })
    }
  }, [currentLineIndex])

  // Fetch lyrics when song changes
  useEffect(() => {
    if (spotifyData?.song && spotifyData?.artist) {
      fetchLyrics(spotifyData.song, spotifyData.artist)
    }
  }, [spotifyData?.song, spotifyData?.artist])

  // Reset refs when lyrics change
  useEffect(() => {
    lineRefs.current = lyrics.map(() => null)
  }, [lyrics])

  const fetchLyrics = async (song: string, artist: string) => {
    try {
      setIsLoadingLyrics(true)
      setLyricsError(null)
      setCurrentLineIndex(-1)

      // In a real implementation, you would call an actual lyrics API
      // For this demo, we'll simulate an API call with a timeout
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Calculate total duration
      const totalDuration = spotifyData?.timestamps ? spotifyData.timestamps.end - spotifyData.timestamps.start : 180000 // Default 3 minutes

      // Generate mock lyrics with timestamps
      const mockLyrics: LyricsLine[] = generateMockLyrics(song, artist, totalDuration)
      setLyrics(mockLyrics)
    } catch (error) {
      console.error("Failed to fetch lyrics:", error)
      setLyricsError("Couldn't load lyrics for this song")
    } finally {
      setIsLoadingLyrics(false)
    }
  }

  const generateMockLyrics = (song: string, artist: string, duration: number): LyricsLine[] => {
    // This function generates mock lyrics with timestamps
    // In a real app, you'd get this data from a lyrics API
    const lines = [
      `[Intro]`,
      `${song} by ${artist}`,
      ``,
      `[Verse 1]`,
      `This is where the first verse would be`,
      `With lyrics synchronized to the music`,
      `Each line appearing as the song plays`,
      `Just like in the real Spotify app`,
      ``,
      `[Chorus]`,
      `This is the chorus part of the song`,
      `Where the main hook is repeated`,
      `The most memorable part of the track`,
      `That everyone loves to sing along`,
      ``,
      `[Verse 2]`,
      `Now we're in the second verse`,
      `Continuing the story of the song`,
      `With more lyrics that follow the beat`,
      `And match the rhythm of the music`,
      ``,
      `[Bridge]`,
      `This is the bridge section`,
      `Often with a different melody`,
      `Before returning to the final chorus`,
      ``,
      `[Chorus]`,
      `This is the chorus part of the song`,
      `Where the main hook is repeated`,
      `The most memorable part of the track`,
      `That everyone loves to sing along`,
      ``,
      `[Outro]`,
      `And finally the song comes to an end`,
      `With the last few notes fading away`,
    ]

    // Distribute timestamps evenly across the song duration
    return lines.map((text, index) => {
      const startTimeMs = Math.floor((duration / lines.length) * index)
      return {
        text,
        startTimeMs,
      }
    })
  }

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
          <span className="text-white text-sm font-medium">Currently Playing</span>
        </div>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-700 rounded w-1/2"></div>
        </div>
      </div>
    )
  }

  if (!spotifyData || !data?.listening_to_spotify) {
    return (
      <div className="bg-gray-800/90 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
        <div className="flex items-center gap-3 mb-3">
          <svg className="w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z" />
          </svg>
          <span className="text-white text-sm font-medium">Currently Playing</span>
        </div>
        <p className="text-gray-400 text-sm">Not listening to Spotify</p>
      </div>
    )
  }

  const totalDuration = spotifyData.timestamps ? spotifyData.timestamps.end - spotifyData.timestamps.start : 0

  return (
    <div className="bg-gray-800/90 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 relative">
      {/* Lyrics Modal */}
      {showLyrics && (
        <div className="absolute inset-0 bg-gray-900/95 backdrop-blur-sm rounded-xl p-4 z-10 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Mic className="w-4 h-4 text-green-500" />
              <h3 className="text-white font-medium text-sm">Lyrics</h3>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={`https://open.spotify.com/search/${encodeURIComponent(
                  `${spotifyData.song} ${spotifyData.artist}`,
                )}`}
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
              {spotifyData.album_art_url ? (
                <img
                  src={spotifyData.album_art_url || "/placeholder.svg"}
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
              <p className="text-white font-medium text-sm truncate">{spotifyData.song}</p>
              <p className="text-gray-400 text-xs truncate">{spotifyData.artist}</p>
            </div>
          </div>

          {isLoadingLyrics ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="animate-pulse flex flex-col items-center">
                <div className="w-8 h-8 bg-green-500/20 rounded-full mb-2"></div>
                <p className="text-gray-400 text-sm">Loading lyrics...</p>
              </div>
            </div>
          ) : lyricsError ? (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-gray-400 text-sm">{lyricsError}</p>
            </div>
          ) : (
            <div
              ref={lyricsContainerRef}
              className="flex-1 overflow-y-auto space-y-2 pr-2 lyrics-container"
              style={{ scrollBehavior: "smooth" }}
            >
              {lyrics.map((line, index) => (
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
          )}

          {/* Progress Bar in Lyrics View */}
          <div className="mt-4 pt-4 border-t border-gray-700/50">
            <div className="space-y-2">
              <div className="w-full bg-gray-700 rounded-full h-1">
                <div
                  className="bg-green-500 h-1 rounded-full transition-all duration-1000 ease-linear"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-400">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(totalDuration)}</span>
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
          <span className="text-white text-sm font-medium">Currently Playing</span>
        </div>
        <button
          onClick={() => setShowLyrics(true)}
          className="text-gray-400 hover:text-green-500 transition-colors"
          title="Show lyrics"
        >
          <Mic className="w-4 h-4" />
        </button>
      </div>

      {/* Song Info */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-gray-700 rounded-lg flex-shrink-0 overflow-hidden">
          {spotifyData.album_art_url ? (
            <img
              src={spotifyData.album_art_url || "/placeholder.svg"}
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
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-white font-medium text-sm truncate">{spotifyData.song}</p>
          <p className="text-gray-400 text-xs truncate">{spotifyData.artist}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="w-full bg-gray-700 rounded-full h-1">
          <div
            className="bg-green-500 h-1 rounded-full transition-all duration-1000 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-400">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(totalDuration)}</span>
        </div>
      </div>

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
