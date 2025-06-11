"use client"

import { useState, useEffect, useCallback } from "react"

// Spotify API types
export interface SpotifyTrack {
  id: string
  name: string
  artist: string
  album: string
  album_art_url: string
  duration_ms: number
  progress_ms: number
  is_playing: boolean
  external_url: string
  timestamps?: {
    start: number
    end: number
  }
}

export interface SpotifyLyrics {
  lines: {
    text: string
    startTimeMs: number
  }[]
  syncType: "LINE_SYNCED" | "UNSYNCED"
}

export function useSpotify() {
  const [track, setTrack] = useState<SpotifyTrack | null>(null)
  const [lyrics, setLyrics] = useState<SpotifyLyrics | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  // Generate realistic mock Spotify data
  const generateMockTrack = useCallback((): SpotifyTrack | null => {
    // 60% chance of having music playing
    if (Math.random() > 0.6) {
      return null
    }

    const mockTracks = [
      {
        id: "mock-track-1",
        name: "Blinding Lights",
        artist: "The Weeknd",
        album: "After Hours",
        album_art_url: "/placeholder.svg?height=300&width=300",
        duration_ms: 200040,
        is_playing: true,
        external_url: "https://open.spotify.com/track/0VjIjW4GlULA4LGoDOLVKN",
      },
      {
        id: "mock-track-2",
        name: "As It Was",
        artist: "Harry Styles",
        album: "Harry's House",
        album_art_url: "/placeholder.svg?height=300&width=300",
        duration_ms: 167303,
        is_playing: true,
        external_url: "https://open.spotify.com/track/4Dvkj6JhhA12EX05fT7y2e",
      },
      {
        id: "mock-track-3",
        name: "Heat Waves",
        artist: "Glass Animals",
        album: "Dreamland",
        album_art_url: "/placeholder.svg?height=300&width=300",
        duration_ms: 238805,
        is_playing: true,
        external_url: "https://open.spotify.com/track/02MWAaffLxlfxAUY7c5dvx",
      },
      {
        id: "mock-track-4",
        name: "Levitating",
        artist: "Dua Lipa",
        album: "Future Nostalgia",
        album_art_url: "/placeholder.svg?height=300&width=300",
        duration_ms: 203064,
        is_playing: true,
        external_url: "https://open.spotify.com/track/463CkQjx2Zk1yXoBuierM9",
      },
    ]

    const selectedTrack = mockTracks[Math.floor(Math.random() * mockTracks.length)]
    const startTime = Date.now() - Math.floor(Math.random() * selectedTrack.duration_ms)
    const currentProgress = Math.min(Date.now() - startTime, selectedTrack.duration_ms)

    return {
      ...selectedTrack,
      progress_ms: currentProgress,
      timestamps: {
        start: startTime,
        end: startTime + selectedTrack.duration_ms,
      },
    }
  }, [])

  // Generate mock lyrics
  const generateMockLyrics = useCallback((trackName: string): SpotifyLyrics => {
    const lines = [
      `[Intro]`,
      `${trackName} begins to play`,
      `With a beautiful melody`,
      ``,
      `[Verse 1]`,
      `The music flows through the air`,
      `Each note perfectly placed`,
      `Creating a magical atmosphere`,
      `That takes you to another place`,
      ``,
      `[Chorus]`,
      `This is the moment we've been waiting for`,
      `The beat drops and we can't ignore`,
      `The rhythm that moves our soul`,
      `Music makes us feel whole`,
      ``,
      `[Verse 2]`,
      `Every lyric tells a story`,
      `Every chord brings us glory`,
      `In this symphony of sound`,
      `Pure emotion can be found`,
      ``,
      `[Bridge]`,
      `Close your eyes and feel the vibe`,
      `Let the music be your guide`,
      `Through the highs and through the lows`,
      `This is how the magic grows`,
      ``,
      `[Chorus]`,
      `This is the moment we've been waiting for`,
      `The beat drops and we can't ignore`,
      `The rhythm that moves our soul`,
      `Music makes us feel whole`,
      ``,
      `[Outro]`,
      `As the song comes to an end`,
      `The memories will transcend`,
      `Forever in our hearts it stays`,
      `Until we meet again someday`,
    ]

    return {
      syncType: "LINE_SYNCED",
      lines: lines.map((text, index) => ({
        text,
        startTimeMs: index * 8000, // 8 seconds per line
      })),
    }
  }, [])

  // Simulate fetching current track
  const fetchCurrentTrack = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 300))

      // Generate mock track data
      const mockTrack = generateMockTrack()

      if (mockTrack) {
        setTrack(mockTrack)
        // Generate mock lyrics
        const mockLyrics = generateMockLyrics(mockTrack.name)
        setLyrics(mockLyrics)
      } else {
        setTrack(null)
        setLyrics(null)
      }

      setLastUpdated(new Date())
    } catch (err) {
      console.error("Error fetching Spotify data:", err)
      setError("Failed to fetch Spotify data")
      setTrack(null)
      setLyrics(null)
    } finally {
      setLoading(false)
    }
  }, [generateMockTrack, generateMockLyrics])

  // Update progress for playing tracks
  useEffect(() => {
    if (!track?.is_playing || !track.timestamps) return

    const updateProgress = () => {
      const now = Date.now()
      const elapsed = now - track.timestamps!.start
      const newProgress = Math.min(elapsed, track.duration_ms)

      if (newProgress >= track.duration_ms) {
        // Song ended, fetch new track
        fetchCurrentTrack()
      } else {
        setTrack((prev) => (prev ? { ...prev, progress_ms: newProgress } : null))
      }
    }

    const interval = setInterval(updateProgress, 1000)
    return () => clearInterval(interval)
  }, [track, fetchCurrentTrack])

  // Initial fetch and polling
  useEffect(() => {
    fetchCurrentTrack()

    // Update every 30 seconds to simulate track changes
    const interval = setInterval(() => {
      fetchCurrentTrack()
    }, 30000)

    return () => clearInterval(interval)
  }, [fetchCurrentTrack])

  // Manual refresh function
  const refetch = useCallback(() => {
    fetchCurrentTrack()
  }, [fetchCurrentTrack])

  return {
    track,
    lyrics,
    loading,
    error,
    lastUpdated,
    refetch,
  }
}
